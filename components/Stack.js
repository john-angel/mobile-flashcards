import {createStackNavigator, createAppContainer} from 'react-navigation'
import DeckList from './DeckList'
import Deck from './Deck'
import Quiz from './Quiz'
import NewQuestion from './NewQuestion'


const Stack = createStackNavigator({
    DeckList: {
        screen: DeckList
    },
    Deck: {
        screen: Deck,

    },
    Quiz: {
        screen: Quiz
    },
    NewQuestion: {
        screen: NewQuestion
    }
})

export default createAppContainer(Stack);