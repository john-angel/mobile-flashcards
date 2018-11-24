import React, {Component} from 'react'
import { View, Text, StyleSheet,TouchableOpacity,FlatList } from 'react-native'
import { connect } from 'react-redux'
import { saveDecks } from '../actions'
import {getDecks} from '../utils/storage'
import { AppLoading} from 'expo'



class Decks extends Component {
    
    state = {
        ready:false
    }
    
    componentDidMount(){

        getDecks().then((data) => {           
            this.props.dispatch(saveDecks(data))
            this.setState({ ready:true })
        }).catch(() => (console.log('No decks')))
    }

    keyExtractor = (deck, index) => {
        return deck.title
    } 
    
    getDeckComponent = (deck)=> {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck',{id:deck.item.title,cards:deck.item.questions.length})}>
                <Text>{deck.item.title}</Text>
            </TouchableOpacity>
        )        
    }

    mapDecks = (decks) => {
        decksArray = Object.keys(decks).map(deck => decks[deck]);
        return decksArray
    }
    
    render(){
        return (
            
            <View style={styles.container}>
            { this.state.ready === false ?
                <AppLoading /> :
                <FlatList data={this.mapDecks(this.props.decks)} keyExtractor={this.keyExtractor} extraData={this.props} renderItem={this.getDeckComponent} /> 
            }                                    
            </View>
        )
    }
}

function mapStateToProps(decks) {
    return{
        decks
    }
}


export default connect(mapStateToProps)(Decks)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems:'center'

    },
});

