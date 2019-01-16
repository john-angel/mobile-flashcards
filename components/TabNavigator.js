import { createBottomTabNavigator } from 'react-navigation';
import Decks from './Decks'
import NewDeck from './NewDeck'

const TabNavigator = createBottomTabNavigator({
    Decks: {
        screen: Decks
    },
    NewDeck: {
        screen: NewDeck
    }   
})


export default TabNavigator;

