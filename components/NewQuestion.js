import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import {saveQuestion} from '../utils/storage'
import { connect } from 'react-redux'
import { addQuestion } from '../actions/questions'
import TextButton from './TextButton'

class NewQuestion extends Component{

    state = {
        question: '',
        answer: ''
    }
    
    save = () => {
        const id = this.props.navigation.getParam('id', '0')
        saveQuestion(id,this.state.question,this.state.answer)
        .then((question) => {
            this.props.dispatch(addQuestion(id,question))
            this.setState({question:'', answer:''})
        })       
    }
   
    render(){
        const disableSaving = this.state.question.length > 0 && this.state.answer.length > 0 ? false : true
        return(
            <View style={styles.container}>
                <TextInput defaultValue={this.state.question} style={styles.input} placeholder="Question..." onChangeText={(question) => this.setState({question})}/>
                <TextInput defaultValue={this.state.answer} style={styles.input} placeholder="Answer..." onChangeText={(answer) => this.setState({answer})}/>
                <TextButton disabled={disableSaving} type={'yes'} onPress={this.save}>Submit</TextButton>
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
    input: {
        fontSize:19,
    }
});


export default connect()(NewQuestion);