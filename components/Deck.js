import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

class Deck extends Component{
   
    render(){
        return(
            <View>
                <Text>Deck name</Text>
                <Text># cards</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Quiz')}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('NewQuestion')}>
                    <Text>Add question</Text>
                </TouchableOpacity>

            </View>

        )
    }
}

export default Deck;