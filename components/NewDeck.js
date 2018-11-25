import React, { Component } from 'react'
import { View, TextInput, Button,Text } from 'react-native'
import {saveDeckTitle,getDecks,getDeck, removeDecks} from '../utils/storage'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { saveDeck } from '../actions/decks'

class NewDeck extends Component{

    state = {
        name: '',
        text:''
    }

    save = () => {
        saveDeckTitle(this.state.name).then((deck)=>{
            this.setState({text:`${this.state.name} saved!`})
            this.props.dispatch(saveDeck(deck))
            this.toHome();
        })
    }

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({key: 'NewDeck'}))
    }

    deleteDecks = () => {
        removeDecks().catch((error) => {
            console.log(error)

        })
    }

    showAllDecks = () => {
        getDecks().then((decks)=>{
            this.setState({text:`${JSON.stringify(decks)}`})
        })
    }

    showDeck = () => {
        getDeck(this.state.name).then((deck)=>{
            this.setState({text:`${this.state.name} ${JSON.stringify(deck)}`})
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

export default connect()(NewDeck);