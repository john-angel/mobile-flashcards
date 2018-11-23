import React, { Component } from 'react'
import { View, TextInput, Button } from 'react-native'
import {saveQuestion} from '../utils/storage'

class NewQuestion extends Component{
    
    save = () => {
        const id = this.props.navigation.getParam('id', '0')
        saveQuestion(id,this.question,this.answer)
    }

    render(){
        return(
            <View>
                <TextInput placeholder="Question..." onChangeText={(question) => this.question = question}/>
                <TextInput placeholder="Answer..." onChangeText={(answer) => this.answer = answer}/>
                <Button title='Save' onPress={this.save}/>
            </View>

        )
    }
}

export default NewQuestion;