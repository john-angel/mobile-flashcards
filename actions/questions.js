export const ADD_QUESTION = 'ADD_QUESTION'

export function addQuestion(deckId,question) {
    console.log(`Action creator ${deckId} - `, question)
    return {
        type: ADD_QUESTION,
        deckId,
        question
    }
}


