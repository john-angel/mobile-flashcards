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
        lastQuestion: false,
        showAnswer: false,
        pendingAnswer:true
    }

    componentDidMount(){
        const {deckId, questionId} = this.props
        
        getDeck(deckId).then((deck) => {
            this.questionsLength = deck.questions.length

            question = deck.questions[questionId].question
            answer = deck.questions[questionId].answer
            
            this.setState({
                question:question,
                answer:answer,
                lastQuestion: deck.questions.length === questionId + 1
            })
        })        
    }

    next = () => {
        nextQuestion = this.props.navigation.push('Card',{
                id:this.props.deckId,
                question:this.props.questionId + 1
            }
        )
    }

    onCorrect = () => {        
        const {deckId, questionId} = this.props

        saveOption(deckId,questionId,'correct')
        .then((option) => {
            this.props.dispatch(addAnswerSelected(deckId,questionId,option))
            this.setState({pendingAnswer:false})
        })
    }

    onIncorrect = () => {
        const {deckId, questionId} = this.props

        saveOption(deckId,questionId,'inCorrect')
        .then((option) => {
            this.props.dispatch(addAnswerSelected(deckId,questionId,option))
            this.setState({pendingAnswer:false})
        })
    }

    onResult = () => this.props.navigation.navigate('Result',{id:this.props.deckId})    

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>{this.state.question}</Text>
                {
                    this.state.showAnswer === true ? (
                        <View>
                            <Text style={styles.text}>{this.state.answer}</Text>
                            <TextButton type={'yes'} onPress={this.onCorrect}>Correct</TextButton>
                            <TextButton type={'no'} onPress={this.onIncorrect}>Incorrect</TextButton>
                        </View>                        
                    )
                    : (
                        <TextButton type={'standard'} onPress={() => this.setState({showAnswer:true})}>Show answer</TextButton>
                    )                                    
                }
                {this.questionsLength === this.props.questionId + 1 ?
                (
                    <View>                        
                        <TextButton disabled={this.state.pendingAnswer} type={'standard'} onPress={this.onResult}>Result</TextButton>
                        <Text>Last question</Text>
                    </View>
                )                    
                :
                    <View>
                        <TextButton disabled={this.state.pendingAnswer} type={'yes'} onPress={this.next}>Next</TextButton>
                        <Text>{this.questionsLength - (this.props.questionId + 1)} remaining</Text>
                    </View>
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
    text:{
        fontSize:19,
        textAlign:'center'
    }
});


function mapStateToProps(state,props) {
    //console.log('mapStateToProps Card - state', state)
    
    const deckId = props.navigation.getParam('id', '0')
    const questionId = props.navigation.getParam('question', '0')   

    return{
        deckId,
        questionId
    }
}

export default connect(mapStateToProps)(Card);