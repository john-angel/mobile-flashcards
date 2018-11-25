import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addAnswerSelected } from '../actions/questions'
import {getDeck, saveOption} from '../utils/storage'
import TextButton from './TextButton'

class Card extends Component{

    state = {
        question:'',
        answer:'',
        id:'',
        deckId:'',
        lastQuestion: false,
        showAnswer: false
    }

    componentDidMount(){
        const id = this.props.navigation.getParam('id', '0')
        const questionId = this.props.navigation.getParam('question', '0')
        console.log('Card id:', id)
        console.log('Question id:', questionId)
        
        getDeck(id).then((deck) => {
            console.log('Deck to evaluate', deck)
            this.questionsLength = deck.questions.length
            console.log('# questions:', deck.questions.length)

            question = deck.questions[questionId].question
            answer = deck.questions[questionId].answer
            console.log('Question:', question)
            console.log('Answer:', answer)
            
            this.setState({
                question:question,
                answer:answer,
                id: questionId,
                deckId: id,
                lastQuestion: deck.questions.length === questionId + 1
            })

        })
        
    }

    next = () => {
        console.log('Next card:', this.state.id + 1)
        nextQuestion = this.props.navigation.push('Card',{
                id:this.state.deckId,
                question:this.state.id + 1
            }
        )

    }

    onCorrect = () => {
        console.log('onCorrect')
        const deckId = this.props.navigation.getParam('id', '0')
        const questionId = this.props.navigation.getParam('question', '0')

        saveOption(this.state.deckId,this.state.id,'correct')
        .then((option) => this.props.dispatch(addAnswerSelected(deckId,questionId,option)))
    }

    onIncorrect = () => {
        console.log('onIncorrect')
        const deckId = this.props.navigation.getParam('id', '0')
        const questionId = this.props.navigation.getParam('question', '0')

        saveOption(this.state.deckId,this.state.id,'inCorrect')
        .then((option) => this.props.dispatch(addAnswerSelected(deckId,questionId,option)))
    }
    

    render(){
        return(
            <View style={styles.container}>
                <Text>Question for deck</Text>
                <Text>{this.state.question}</Text>
                {
                    this.state.showAnswer === true ? (
                        <View>
                            <Text>{this.state.answer}</Text>
                            <TextButton type={'yes'} onPress={this.onCorrect}>Correct</TextButton>
                            <TextButton type={'no'} onPress={this.onIncorrect}>Incorrect</TextButton>
                        </View>                        
                    )
                    : (
                        <TextButton type={'standard'} onPress={() => this.setState({showAnswer:true})}>Show answer</TextButton>
                    )                                    
                }
                <TextButton disabled={this.state.lastQuestion} type={'yes'} onPress={this.next}>Next</TextButton>
                {this.questionsLength === this.state.id + 1 ?
                (
                    <View>
                        <Text>Last question</Text>
                        <TextButton type={'standard'} onPress={() => this.props.navigation.navigate('Result',{id:this.state.deckId})}>Result</TextButton>
                    </View>
                )                    
                :
                    <Text>{this.questionsLength - (this.state.id + 1)} remaining</Text>
                }                
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
});

export default connect()(Card);