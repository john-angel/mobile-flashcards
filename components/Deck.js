import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {createStackNavigator} from 'react-navigation'
import Quiz from './Quiz'
import NewQuestion from './NewQuestion'

class DeckHome extends Component{
    // onPress={() => this.props.navigation.navigate('Quiz')}
    //onPress={() => this.props.navigation.navigate('NewQuestion')}
    render(){
        return(
            <View>
                <Text>Deck name</Text>
                <Text># cards</Text>
                <TouchableOpacity>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text>Add question</Text>
                </TouchableOpacity>

            </View>

        )
    }
}

const Deck = createStackNavigator({
    Home: {
        screen: DeckHome
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            //header: null           
        }
    },
    NewQuestion: {
        screen: NewQuestion,
        navigationOptions: {
            //header: null         
        }
    }
})

export default Deck;