import {SET_ACTIVEDECK } from '../actions/activeDeck'
 
export default function activeDeck (state = null, action) {
  //convert action.title to deck in action
  switch (action.type) {
        case SET_ACTIVEDECK:
            return  {
                ...state,
                ...action.activeDeck
            }
        //   case  CLEAR_DECKQUIZ:
        //     return  {
        //         ...state,
        //         [action.deck.title]: action.deck,
        //         activeDeck:action.deck
        //     }
        default :
            return state
    }
}