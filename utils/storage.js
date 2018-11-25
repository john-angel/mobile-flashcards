import { AsyncStorage } from 'react-native'

const FLASHCARDS_STORAGE_KEY = 'Udacity:mobileFlashcards'

export function saveDeckTitle(title) {
    const deck = buildDeck(title)
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(deck))
    .then(() => deck)
}

export function getDecks(){
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((decks) => JSON.parse(decks))
}

export function getDeck(id){    
    return getDecks().then((result) => result[id])
}

export function removeDecks(){
    return AsyncStorage.removeItem(FLASHCARDS_STORAGE_KEY)
}

export function saveQuestion(deckId,question,answer){
    let questionObj = {}
    
    return getDecks()
    .then((decks) => {
        deck = decks[deckId]
        questionObj = buildQuestion(question,answer)
        deck.questions.push(questionObj)
        return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))                   
    })
    .then(() => (questionObj))    
}

export function saveOption(deckId,questionId,option){
    return getDecks()
    .then((decks) => {
        deck = decks[deckId]
        question = deck.questions[questionId]
        question.option = option
        console.log('Decks updated:', decks);
        return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
    })
    .then(() => (option))
}

 function buildDeck(key){
    return {
        [key]: {
            title:key,
            questions:[]
        }
    }
}

function buildQuestion(question,answer,option = ''){
    return {
        question,
        answer,
        option
    }
}


/*

{
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
          option: 'correct'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
          option: 'incorrect'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
          option: ''
        }
      ]
    }
}
*/