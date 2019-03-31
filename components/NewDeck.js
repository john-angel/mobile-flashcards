import React, { Component } from 'react'
import { View, TextInput, StyleSheet} from 'react-native'
import {saveDeckTitle} from '../utils/storage'
import { connect } from 'react-redux'
import {gray,green} from '../utils/colors'
import { saveDeck } from '../actions/decks'
import TextButton from './TextButton'

class NewDeck extends Component{

    state = {
        name: '',
        buttonColor:gray
    }

    add = () => {
        let name = this.state.name.trim()
        this.setState({name})
        
        saveDeckTitle(name).then((deck)=>{
            this.props.dispatch(saveDeck(deck))
            this.toDeck();
        })
        
    }

    toDeck = () => {  
        const text = this.state.name
        
        this.setState({name:''})
        this.props.navigation.navigate('Deck',{id:text})

    }

    onChangeName = (name) => {

        const disabled = !name.trim()

        disabled === false ? this.setState({name:name,buttonColor:green }) : this.setState({name:name, buttonColor:gray })

    }

   
    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.input} value={this.state.name} placeholder="Deck name..." onChangeText={(name) => this.onChangeName(name)} />
                <TextButton disabled={this.state.buttonColor === gray} type={'yes'} buttonStyle={{marginTop: 10}} textStyle={{color:this.state.buttonColor}} onPress={this.add}>Add</TextButton>
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
        textAlign: 'center',
        marginBottom:10

    }
})

export default connect()(NewDeck);