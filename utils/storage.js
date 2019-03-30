import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const FLASHCARDS_STORAGE_KEY = 'Udacity:mobileFlashcards'
const FLASHCARDS_NOTIFICATION = 'Udacity:mobileFlashcards-Notification'

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

export function notificationScheduled(){
    return AsyncStorage.getItem(FLASHCARDS_NOTIFICATION)
    .then((notificationObj) => JSON.parse(notificationObj))        
    .catch((error) => false)   
    
}

export function scheduleNotification(hour,minute){
        
    Permissions.getAsync(Permissions.NOTIFICATIONS)
    .then(status => {
        console.log('Permissions already granted', status)
        if(!status.permissions.notifications.allowsAlert){
            requestPermissions()
        }else{
            saveNotification(hour,minute)
        }
    })                
    .catch((error) => (console.warn('Error getting notification permission: ', error)))
}

function requestPermissions(){
    Permissions.askAsync(Permissions.NOTIFICATIONS)
    .then((status ) => {
        if(status.permissions.notifications.allowsAlert){
            console.log('Permissions granted', status)
            saveNotification()                        
        }else{
            console.log('Notification permissions denied')
        }
    })
    .catch((error) => (console.log('Error requesting permissions', error)))
}

function saveNotification(hour,minute){
    
    Notifications.cancelAllScheduledNotificationsAsync()

    let date = new Date()
    date.setDate(date.getDate())
    date.setHours(hour)
    date.setMinutes(minute)
    date.setMilliseconds(0)

    let notificationObj = {hour: hour, minute: minute, period:hour >= 12 ? 'PM' : 'AM'}

    Notifications.scheduleLocalNotificationAsync(
        createNotificationObject(),
        {
            time: date,
            repeat: 'day',
        }
    ).then(id => {
        AsyncStorage.setItem(FLASHCARDS_NOTIFICATION, JSON.stringify(notificationObj))
        console.log(`Notification set for ${date.getHours()}:${date.getMinutes()}`)
    })
    .catch(error => (console.log('Error scheduling local notification:', error)))   

}

function createNotificationObject(){
    return {
      title: 'Quiz time!',
      body: "Don't forget to take a quiz today!",
      data:{test:"👋 Don't forget to take a quiz today!"},      
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