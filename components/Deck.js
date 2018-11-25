import React, { Component } from 'react'
import { Text, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'

class Deck extends Component{
    
    state = {
        fadeAnim: new Animated.Value(0)
    }

    componentDidMount(){
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
              toValue: 1,                   // Animate to opacity: 1 (opaque)
              duration: 2000,              // Make it take a while
            }
        ).start();   
    }
  
    render(){
        let { fadeAnim } = this.state;
        const { deckId,numberOfQuestions } = this.props
        const disableQuiz = numberOfQuestions > 0 ? false : true
        return(
            <Animated.View style={[styles.container, {opacity:fadeAnim}]}>
                <Text style={styles.text}>Deck {deckId}</Text>
                <Text style={styles.text}>{this.props.numberOfQuestions} questions</Text>
                <TextButton disabled={disableQuiz} type={'standard'} onPress={() => this.props.navigation.navigate('Card', { id: deckId, question: 0 })}>Start Quiz</TextButton>
                <TextButton type={'standard'} onPress={() => this.props.navigation.navigate('NewQuestion', { id: deckId })}>Add Card</TextButton>
            </Animated.View>
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