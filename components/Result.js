import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
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
    
    render(){  

        return(
            <View style={styles.container}>
                <Text style={styles.text}>Result for deck {this.props.navigation.getParam('id', '0')}</Text>
                <Text style={styles.text}>{this.state.result} questions correct out of {this.state.numberQuestions}</Text>
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
    text: {
        fontSize:19
    }
})
export default Result;