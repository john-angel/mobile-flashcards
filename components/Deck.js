import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'

class Deck extends Component{

    
    render(){
        const { deckId,numberOfQuestions } = this.props
        const disableQuiz = numberOfQuestions > 0 ? false : true
        return(
            
            <View style={styles.container}>
                <Text style={styles.text}>Deck {deckId}</Text>
                <Text style={styles.text}>{this.props.numberOfQuestions} questions</Text>
                <TextButton disabled={disableQuiz} type={'standard'} onPress={() => this.props.navigation.navigate('Card',{id:deckId,question:0})}>Start Quiz</TextButton>                
                <TextButton type={'standard'} onPress={() => this.props.navigation.navigate('NewQuestion',{id:deckId})}>Add Card</TextButton>                
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
function mapStateToProps(state,props) {
    
    const deckId = props.navigation.getParam('id', '0')
    //console.log(`mapStateToProps - Deck. Deckid ${deckId} - state`, state)
    return{
        deckId,
        numberOfQuestions:state[deckId].questions.length,
    }
}
export default connect(mapStateToProps)(Deck);