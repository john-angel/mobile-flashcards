export const SAVE_DECKS = 'SAVE_DECKS'
export const SAVE_DECK = 'SAVE_DECK'


export function saveDecks(decks) {
    return {
        type: SAVE_DECKS,
        decks
    }
}

export function saveDeck(deck) {
    return {
        type: SAVE_DECK,
        deck
    }
} 
