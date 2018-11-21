import React, { Component } from 'react'
import { View, TextInput, Button,Text } from 'react-native'
import {saveDeckTitle,getDecks,getDeck, removeDecks} from '../utils/storage'

class NewDeck extends Component{

    state = {
        name: '',
        text:''
    }

    save = () => {
        saveDeckTitle(this.state.name).then(()=>{
            console.log('Deck', this.state.name, 'saved')
            this.setState({text:`${this.state.name} saved!`})         
        })
    }

    deleteDecks = () => {
        removeDecks().catch((error) => {
            console.log(error)

        })
    }

    showAllDecks = () => {
        getDecks().then((decks)=>{
            console.log('Decks:', decks)
            this.setState({text:`Decks: ${JSON.stringify(decks)}`})
        })
    }

    showDeck = () => {
        getDeck(this.state.name).then((deck)=>{
            console.log(`Deck ${this.state.name} ${deck.title}`)
            this.setState({text:`Deck ${this.state.name} ${JSON.stringify(deck)}`})
        })        
    }
    
    render(){
        return(
            <View>
                <TextInput placeholder="Deck name..." onChangeText={(name) => this.setState({name})}/>
                <Button title='Save' onPress={this.save}/>                
                <Button title='Show all decks' onPress={this.showAllDecks}/>
                <Button title='Show deck' onPress={this.showDeck}/>
                <Button title='Delete decks' onPress={this.deleteDecks}/>
                <Text>Decks saved: {this.state.text}</Text>
                

            </View>

        )
    }
}

export default NewDeck;