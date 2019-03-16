import {createStackNavigator, createAppContainer} from 'react-navigation'
import TabNavigator from './TabNavigator'
import Deck from './Deck'
import NewQuestion from './NewQuestion'
import Card from './Card'
import Result from './Result'

const Stack = createStackNavigator({
    TabNavigator: {
        screen: TabNavigator
    },
    Deck: {
        screen: Deck,

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
  initialRouteName: 'TabNavigator',
})

export default createAppContainer(Stack);