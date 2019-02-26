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
                <Text style={styles.deckName}>{this.props.navigation.getParam('id', '0')}</Text>
                <Text style={styles.text}>{this.state.result} questions correct out of {this.state.numberQuestions}</Text>
                <TextButton type={'standard'} onPress={this.onRestartQuiz}>Restart Quiz</TextButton>
                <TextButton type={'standard'} onPress={this.onBackToDeck}>Back to Deck</TextButton>
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
    deckName: {
        fontSize:25,
        color: '#A85ECC'
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