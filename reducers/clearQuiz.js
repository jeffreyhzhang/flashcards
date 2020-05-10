import {CLEAR_DECKQUIZ } from '../actions/clearQuiz'
 
export default function clearQuiz (state = null, action) {
 
  switch (action.type) {
        case  CLEAR_DECKQUIZ:
            return  {
                ...state,
                [action.deck.title]: action.deck,
                activeDeck:action.deck
            }
        default :
            return state
    }
}