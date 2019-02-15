import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addAnswerSelected } from '../actions/questions'
import {getDeck, saveOption} from '../utils/storage'
import { AntDesign } from '@expo/vector-icons'
import { white,blue } from '../utils/colors'

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
        console.log('onCorrect')   
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
                            <Text style={styles.text}>{this.state.question}</Text>
                            <TouchableOpacity style={styles.answerButton}  onPress={this.onShowAnswer}>
                                <Text style={styles.answerButtonText}>Answer</Text>
                            </TouchableOpacity>
                        </View>
                    )
                    : (
                        <View>
                            <Text style={styles.text}>{this.state.answer}</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <TouchableOpacity onPress={this.onCorrect}>
                                    <AntDesign style={{color:'#0EB252',marginTop:'20%'}} name={'check'}  size={29} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onIncorrect}>
                                    <AntDesign style={{color:'#FF3729',marginTop:'20%'}} name={'close'}  size={29} />
                                </TouchableOpacity>
                            </View>
                            <View>  
                                <Text style={{ textAlign: 'center', marginTop: '20%' }}>{this.props.questionId + 1} / {this.questionsLength}</Text>
                                {
                                    this.questionsLength === this.props.questionId + 1 ?
                                    (
                                        <TouchableOpacity onPress={this.onResult}>
                                            <Text style={styles.resultsText}>Result</Text>
                                        </TouchableOpacity>
                                    )
                                    :
                                    (  
                                        <TouchableOpacity  onPress={this.next}>                                             
                                            <AntDesign style={{color:blue, textAlign: 'right'}} name={'right'}  size={29} />                                            
                                        </TouchableOpacity> 
                                    )
                                }
                            </View>
                                                                  
                        </View>                                                   
                    )       
                }
                </Animated.View>
                
            </View>

        )
    }
}

/*


*/


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'     
    },
    card: {        
        borderWidth: 2,
        borderRadius: 6,
        borderColor: '#A85ECC',
        width: '90%',
        height: '50%'        
    },
    text:{
        fontSize:19,
        textAlign:'center',
        marginTop:'20%'
    },
    answerButton:{
        backgroundColor:'#76617F',
        borderRadius: 6,
        marginTop:'20%',
        marginRight:'30%',
        marginLeft:'30%'       
    },
    answerButtonText:{
        color:white,
        fontWeight:'bold',
        fontSize: 20,        
        textAlign:'center',
        paddingTop:5,
        paddingBottom:5
    },
    resultsText:{
        color: '#76617F',
        textAlign: 'center',
        fontSize:19,
        fontWeight:'bold',
        marginTop: '15%'
    }
   
});


function mapStateToProps(state,props) {
    
    const deckId = props.navigation.getParam('id', '0')
    const questionId = props.navigation.getParam('question', '0')   

    return{
        deckId,
        questionId
    }
}

export default connect(mapStateToProps)(Card);