import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import { addAnswerSelected } from '../actions/questions'
import {getDeck, saveOption} from '../utils/storage'
import TextButton from './TextButton'
import { Ionicons } from '@expo/vector-icons'
import { blue } from '../utils/colors'

class Card extends Component{

    state = {
        question:'',
        answer:'',
        lastQuestion: false,
        showAnswer: false,
        pendingAnswer:true,
        fadeAnim: new Animated.Value(0)
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

    onShowAnswer = () => {
        this.setState({showAnswer:true})
        Animated.timing( this.state.fadeAnim,           
        {
            toValue: 1,                   
            duration: 500,              
        }
        ).start(); 
    }
    onResult = () => this.props.navigation.push('Result',{id:this.props.deckId})    

    render(){
        let { fadeAnim } = this.state;
        return(
            <View style={styles.container}>
                <Text style={[styles.text,{fontWeight: 'bold'}]}>{this.state.question}</Text>
                {
                    this.state.showAnswer === true ? (
                        <Animated.View style={{opacity:fadeAnim}}>
                            <Text style={styles.textAnswer}>{this.state.answer}</Text>
                            <TextButton type={'yes'} onPress={this.onCorrect}>Correct</TextButton>
                            <TextButton type={'no'} onPress={this.onIncorrect}>Incorrect</TextButton>
                        </Animated.View>                        
                    )
                    : (
                        <TextButton type={'standard'} onPress={this.onShowAnswer}>Show answer</TextButton>
                    )                                    
                }
                {this.questionsLength === this.props.questionId + 1 ?
                (
                    <View style={{alignItems:'flex-end'}}>                        
                        <TextButton disabled={this.state.pendingAnswer} style={[styles.buttonBottom,{fontSize:19,color:blue}]} onPress={this.onResult}>Result</TextButton>
                        <Text>Last question</Text>
                    </View>
                )                    
                :
                    <View style={{alignItems:'flex-end'}}>
                        <TextButton  disabled={this.state.pendingAnswer} style={styles.buttonBottom} onPress={this.next}>
                            <Ionicons style={{color:blue}}
                                name={'ios-fastforward'}
                                size={29}
                            />                        
                        </TextButton>
                        <Text>{this.questionsLength - (this.props.questionId + 1)} questions remaining</Text>
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
        textAlign:'center',
        marginBottom:10
    },
    textAnswer:{
        fontSize:19,
        textAlign:'center',
        marginBottom:30
    },
    buttonBottom:{
        marginTop:30,
        marginBottom:15
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