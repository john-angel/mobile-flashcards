import React, { Component } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import {saveQuestion} from '../utils/storage'
import { connect } from 'react-redux'
import { addQuestion } from '../actions/questions'

class NewQuestion extends Component{
    
    save = () => {
        const id = this.props.navigation.getParam('id', '0')
        saveQuestion(id,this.question,this.answer)
        .then((question) => {
            this.props.dispatch(addQuestion(id,question))
        })       
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput placeholder="Question..." onChangeText={(question) => this.question = question}/>
                <TextInput placeholder="Answer..." onChangeText={(answer) => this.answer = answer}/>
                {/*Enable only if there is a question and an answer */}
                <Button title='Save' onPress={this.save}/>
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
});


export default connect()(NewQuestion);