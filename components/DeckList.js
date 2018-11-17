import React from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Deck from './Deck'
import NewDeck from './NewDeck'

const Home = ({ navigation }) => (
    <View style={styles.container}>
        <Text>Deck link</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NewDeck')}>
            <Text>Add</Text>
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

export default createAppContainer(DeckList);

