import { AsyncStorage } from 'react-native'

const FLASHCARDS_STORAGE_KEY = 'Udacity:mobileFlashcards'

export function saveDeckTitle(title) {
    const deck = buildDeck(title)
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(deck))
}

export function getDecks(){
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
}

export function getDeck(id){    
    return getDecks().then((result) => JSON.parse(result)[id])
}

export function removeDecks(){
    return AsyncStorage.removeItem(FLASHCARDS_STORAGE_KEY)
}

function buildDeck(key){
    return {
        [key]: {
            title:key,
            questions:[]
        }
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
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
}
*/