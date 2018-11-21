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
            this.setState({decks:decksArray})
        })

    }

    keyExtractor = (deck, index) => {
        return deck.title
    } 
    
    getDeckComponent = (deck)=> {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck',{id:deck.item.title})}>
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

