import React, { Component } from 'react'
import { View, TextInput, Button,Text, StyleSheet } from 'react-native'
import {saveDeckTitle,getDecks,getDeck, removeDecks} from '../utils/storage'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { saveDeck } from '../actions/decks'
import TextButton from './TextButton'

class NewDeck extends Component{

    state = {
        name: ''
    }

    save = () => {
        saveDeckTitle(this.state.name).then((deck)=>{
            this.props.dispatch(saveDeck(deck))
            this.toDeck();
        })
    }

    toDeck = () => {
        this.props.navigation.navigate('Deck',{id:this.state.name})
    }

    deleteDecks = () => {
        removeDecks().catch((error) => {
            console.log(error)
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Deck name..." onChangeText={(name) => this.setState({name})}/>
                <TextButton disabled={this.state.name.length > 0 ? false : true} type={'yes'}style={{padding: 10}} onPress={this.save}>Create Deck</TextButton>
                <Button title='Delete decks' onPress={this.deleteDecks}/>
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
})

export default connect()(NewDeck);