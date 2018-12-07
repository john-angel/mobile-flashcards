import React, { Component } from 'react'
import { View, TextInput, Button,Text, StyleSheet ,TouchableOpacity} from 'react-native'
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
        const text = this.state.name
        
        this.setState({name:''})
        this.props.navigation.navigate('Deck',{id:text})

    }

   
    render(){
        const { name } = this.state;
        const disabled = !name.trim()

        return(
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Deck name..." value={this.state.name} onChangeText={(name) => this.setState({ name })} />
                <TextButton disabled={disabled} type={'yes'} style={{padding: 10}} onPress={this.save}>Create Deck</TextButton>
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