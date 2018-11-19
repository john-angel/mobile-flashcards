import React from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation';
import NewDeck from './NewDeck'

const Home = ({ navigation }) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Deck')}>
            <Text>List of Decks</Text>
        </TouchableOpacity>
    </View>
);

const DeckList = createBottomTabNavigator({
    Decks: {
        screen: Home
    },
    NewDeck: {
        screen: NewDeck
    }  
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default DeckList;

