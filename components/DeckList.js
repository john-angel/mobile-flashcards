import { createBottomTabNavigator } from 'react-navigation';
import Decks from './Decks'
import NewDeck from './NewDeck'

const DeckList = createBottomTabNavigator({
    Decks: {
        screen: Decks
    },
    NewDeck: {
        screen: NewDeck
    }   
})


export default DeckList;

