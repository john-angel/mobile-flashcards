import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

class Deck extends Component{

    
    render(){
        const id = this.props.navigation.getParam('id', '0')
        const cards = this.props.navigation.getParam('cards', '0')
        return(
            <View>
                <Text>Deck {id}</Text>
                <Text>{cards} cards</Text>
                {/*Enable going to the quiz if there're cards*/}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Card',{id:id,question:0})}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('NewQuestion',{id:id})}>
                    <Text>Add question</Text>
                </TouchableOpacity>

            </View>

        )
    }
}

export default Deck;