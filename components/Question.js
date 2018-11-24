import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import {getDeck} from '../utils/storage'

class Question extends Component{

    state = {
        question:'',
        answer:'',
        id:'',
        deckId:'',
        lastQuestion: false
    }

    componentDidMount(){
        const id = this.props.navigation.getParam('id', '0')
        const questionId = this.props.navigation.getParam('question', '0')
        console.log('Card id:', id)
        console.log('Question id:', questionId)
        
        getDeck(id).then((deck) => {
            //console.log('Deck to evaluate', deck)
            this.questionsLength = deck.questions.length
            console.log('# questions:', deck.questions.length)

            question = deck.questions[questionId].question
            answer = deck.questions[questionId].answer
            
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
        console.log('Next question:', this.state.id + 1)
        nextQuestion = this.props.navigation.push('Question',{
                id:this.state.deckId,
                question:this.state.id + 1
            }
        )

    }
    
    render(){
        return(
            <View>
                <Text>Question for deck</Text>
                <Text>{this.state.question}</Text>
                <Text>{this.state.answer}</Text>
                <Button disabled={this.state.lastQuestion} title='Next' onPress={this.next}/>
                {this.questionsLength === this.state.id + 1 ?
                (
                    <View>
                        <Text>Last question</Text>
                        <Button title='Result' onPress={() => this.props.navigation.navigate('Result')} />
                    </View>
                )                    
                :
                    <Text>{this.questionsLength - (this.state.id + 1)} remaining</Text>
                }                
            </View>

        )
    }
}

export default Question;