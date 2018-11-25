import { SAVE_DECKS, SAVE_DECK ,} from '../actions/decks'
import { ADD_QUESTION,ADD_ANSWER_SELECTED } from '../actions/questions'

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
            console.log('Reducer SAVE_DECKS', newState)
            return newState
        case SAVE_DECK:
            return {
                ...state,
                ...action.deck
            }  
        case ADD_QUESTION:
            const { deckId,question } = action
            tempState = Object.keys(state).length === 0 ? initialState(deckId): state
            newState = {
                    ...tempState,                
                    [deckId]:{
                        ...tempState[deckId],
                        questions:tempState[deckId].questions.concat([question])
                    }
                } 
            console.log('Reducer ADD_QUESTION', newState)
            return newState
        case ADD_ANSWER_SELECTED:
            const { answerSelected } = action
         
            newState = {
                ...state,                
                [action.deckId]:{
                    ...state[action.deckId],
                    questions:state[action.deckId].questions.map((item,index) => {
                        if(index !== action.questionId){                            
                            return item
                        }else{
                            return {
                                ...item,
                                option:answerSelected
                            }
                        }
                    })
                }
            } 
            console.log('Reducer ADD_ANSWER_SELECTED', newState)
            return newState
                 
        default:
            return state
    }
}
export default decks 