export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER_SELECTED = 'ADD_ANSWER_SELECTED'

export function addQuestion(deckId,question) {
    console.log(`Action creator ${deckId} - `, question)
    return {
        type: ADD_QUESTION,
        deckId,
        question
    }
}

export function addAnswerSelected(deckId,questionId,answerSelected){
    return {
        type: ADD_ANSWER_SELECTED,
        deckId,
        questionId,
        answerSelected
        
    }
}


