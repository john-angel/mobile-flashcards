import { SAVE_DECKS, SAVE_DECK ,} from '../actions/decks'
import { ADD_QUESTION } from '../actions/questions'

initialState =  (deckId) => (
    {
        [deckId]:{
            title:deckId,
            questions: []
        }
    }
)
function decks(state = {}, action) {
    newState = {}
    switch (action.type) {
        case SAVE_DECKS:
            newState = {
                ...state,
                ...action.decks,
            } 
            console.log('Reducer decks', newState)
            return newState
        case SAVE_DECK:
            return {
                ...state,
                ...action.deck
            }  
        case ADD_QUESTION:
            const { deckId,question } = action
            tempState = Object.keys(state).length === 0 ? initialState(deckId): state
            console.log('TempState', tempState)
            newState = {
                    ...tempState,                
                    [deckId]:{
                        ...tempState[deckId],
                        questions:tempState[deckId].questions.concat([question])
                    }
                } 
            console.log('State updated with new question:', newState)
            return newState
                 
        default:
            return state
    }
}
export default decks 