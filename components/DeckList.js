import React, {Component} from 'react'
import { View, Text, StyleSheet,TouchableOpacity,FlatList } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation';
import {getDecks} from '../utils/storage'
import NewDeck from './NewDeck'

class Decks extends Component {

    state = {
        decks:[]
    }

    componentDidMount(){

        getDecks().then((data)=>{
            decksArray = Object.keys(data).map(deck => data[deck]);
            console.log('Decks to display:', decksArray)
            this.setState({decks:decksArray})
        }).catch(() => (console.log('No decks')))

    }

    keyExtractor = (deck, index) => {
        return deck.title
    } 
    
    getDeckComponent = (deck)=> {
        console.log('Deck to display:', deck)
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck',{id:deck.item.title,cards:deck.item.questions.length})}>
                <Text>{deck.item.title}</Text>
            </TouchableOpacity>
        )        
    }            

    render(){
        return (
            <View style={styles.container}>
                <FlatList data={this.state.decks} keyExtractor={this.keyExtractor} extraData={this.state} renderItem={this.getDeckComponent} />                    
            </View>
        )
    }
}

const DeckList = createBottomTabNavigator({
    Decks: {
        screen: Decks
    },
    NewDeck: {
        screen: NewDeck
    }  
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems:'center'

    },
});

export default DeckList;

