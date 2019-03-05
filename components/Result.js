import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {getDeck} from '../utils/storage'
import TextButton from './TextButton'

class Result extends Component{

    state = {
        numberQuestions: 0,
        result: 0
    }

    componentDidMount(){
        const id = this.props.navigation.getParam('id', '0')

        getDeck(id).then((deck) => {
            console.log('Result for card', deck)
            numberQuestions = deck.questions.length
            let result = 0
            
            deck.questions.forEach(question => {
                result+= question.option === 'correct' ? 1 : 0                
            });
            console.log(`${result} questions correct out of ${numberQuestions}`)
            this.setState({
                numberQuestions:deck.questions.length,
                result:result
            })
        })
    }

    onRestartQuiz = () => this.props.navigation.push('Card',{id:this.props.deckId,question:0})
    onBackToDeck = () => (this.props.navigation.navigate('Deck',{id:this.props.deckId}))
    
    render(){  
      
        return(
            <View style={styles.container}>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.deckName}>{this.props.navigation.getParam('id', '0')}</Text>
                </View>

                <View style={{flexDirection: 'row',justifyContent: 'flex-start',marginTop:5}}>
                    <Text style={styles.item}>Questions: </Text>
                    <Text style={styles.data}>{this.state.numberQuestions}</Text>
                </View>
                <View style={{flexDirection: 'row',justifyContent: 'flex-start',marginTop:5}}>
                    <Text style={styles.item}>Correct: </Text>
                    <Text style={styles.data}>{this.state.result}</Text>
                </View>
                <View style={{flexDirection: 'row',justifyContent: 'space-evenly',marginTop:25}}>
                    <TextButton type={'standard'} onPress={this.onRestartQuiz}>Restart Quiz</TextButton>
                    <TextButton type={'standard'} onPress={this.onBackToDeck}>Back to Deck</TextButton>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'center'      
    },
    deckName: {
        fontSize:25,
        color: '#A85ECC'
    },
    item:{
        fontSize:19,        
        fontWeight:'bold'
    },
    data:{
        fontSize:19
    },
    text: {
        fontSize:19
    }
})

function mapStateToProps(state,props){
    const deckId = props.navigation.getParam('id', '0')
    
    return{
        deckId
    }
}
export default connect(mapStateToProps)(Result);