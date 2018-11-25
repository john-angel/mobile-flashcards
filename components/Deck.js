import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component{

    
    render(){
        const { deckId } = this.props
        return(
            
            <View>
                <Text>Deck {deckId}</Text>
                <Text>{this.props.questions} questions</Text>
                {/*Enable going to the quiz if there're cards*/}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Card',{id:deckId,question:0})}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('NewQuestion',{id:deckId})}>
                    <Text>Add question</Text>
                </TouchableOpacity>

            </View>

        )
    }
}
function mapStateToProps(state,props) {
    
    const deckId = props.navigation.getParam('id', '0')
    console.log(`mapStateToProps - Deck Deckid ${deckId} - state`, state)
    return{
        deckId,
        questions:state[deckId].questions.length,
    }
}
export default connect(mapStateToProps)(Deck);