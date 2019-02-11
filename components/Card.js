import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated, Easing } from 'react-native'
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
        pendingAnswer:true
    }

    constructor(){ 
        super();
        this.spinValue = new Animated.Value(0)
        this.value = 0;

        this.spinValue.addListener(({ value }) => {
            this.value = value;
        })
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

        Animated.timing(
            this.spinValue,
            {
                toValue: !this.value,
                duration: 1000,
                easing: Easing.linear
            }
        ).start(() => {

            this.setState({showAnswer:true})

            Animated.timing(
                this.spinValue,
                {
                    toValue: !this.value,
                    duration: 1000,
                    easing: Easing.linear
                }
            ).start(() => {

            })
        })
       
    }
    onResult = () => this.props.navigation.push('Result',{id:this.props.deckId}) 
   
    render(){

        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '90deg']
        })

        const rotateYStyle = {
            transform: [{ rotateY: spin }]
        }
        return(
            <View style={styles.container}>
                <Animated.View style={[rotateYStyle,styles.card]}>
                {
                    this.state.showAnswer === false ? (
                        <View>
                            <Text style={[styles.text, { fontWeight: 'bold' }]}>{this.state.question}</Text>
                            <TextButton type={'standard'} onPress={this.onShowAnswer}>Show answer</TextButton>
                        </View>
                    )
                    : (
                        <View>
                            <Text style={styles.textAnswer}>{this.state.answer}</Text>
                            <TextButton type={'yes'} onPress={this.onCorrect}>Correct</TextButton>
                            <TextButton type={'no'} onPress={this.onIncorrect}>Incorrect</TextButton>
                        </View>                        
                    )
                }
                   
                </Animated.View>
                
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
    card: {
        borderWidth: 2,
        borderRadius: 6,
        borderColor: '#aa42f4',
        width: '90%',
        height: '50%',
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