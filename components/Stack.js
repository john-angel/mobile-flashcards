import {createStackNavigator, createAppContainer} from 'react-navigation'
import DeckList from './DeckList'
import Deck from './Deck'
import Quiz from './Quiz'
import NewQuestion from './NewQuestion'
import Card from './Card'
import Result from './Result'




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
    },
    Card: {
        screen: Card
    },
    Result: {
        screen: Result
    }
},
{
  initialRouteName: 'DeckList',
})

export default createAppContainer(Stack);