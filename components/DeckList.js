import { createBottomTabNavigator } from 'react-navigation';
import Decks from './Decks'
import NewDeck from './NewDeck'
import Notification from './Notification'

const DeckList = createBottomTabNavigator({
    Decks: {
        screen: Decks
    },
    NewDeck: {
        screen: NewDeck
    },
    Notification: {
        screen: Notification
    }  
})


export default DeckList;

