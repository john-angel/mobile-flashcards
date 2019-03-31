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
        const {question,answer} = this.state
        const disableSaving = !question.trim() || !answer.trim()

        return(
            <View style={styles.container}>
                <TextInput defaultValue={question} style={styles.input} placeholder="Question..." onChangeText={(question) => this.setState({question})}/>
                <TextInput defaultValue={answer} style={styles.input} placeholder="Answer..." onChangeText={(answer) => this.setState({answer})}/>
                <TextButton disabled={disableSaving} type={'yes'} buttonStyle={{marginTop: 10}} onPress={this.save}>Add</TextButton>
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
        marginBottom:10
    }
});


export default connect()(NewQuestion);