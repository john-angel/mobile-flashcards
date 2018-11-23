import React, { Component } from 'react'
import { View, Text } from 'react-native'

class Result extends Component{
    
    render(){
        const id = this.props.navigation.getParam('id', '0')
  
        return(
            <View>
                <Text>Result for deck {id}</Text>
            </View>

        )
    }
}

export default Result;