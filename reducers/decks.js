
import {GET_DECK, RECEIVE_DECKS,ADD_DECKTITLE,ADD_CARDTODECK,REMOVE_DECK,INIT_DECKS,CLAER_DECKS,QUIZ_DECKCARD} from '../actions/decks'
 
function decks (state = {}, action) {

  switch (action.type) {

    case CLAER_DECKS:
      return { }  //return empty obj

    case GET_DECK:
      return {
        ...state,
        ...action.deck
      } 

    case INIT_DECKS:
      return {
        ...action.decks
      } //have some to start with

    case RECEIVE_DECKS :
      return {
        ...action.decks,
      }

    case ADD_DECKTITLE :
      return {
          ...state,
          [action.title]:{
            title:action.title,
            cards:[]
          }
        }
      
    case ADD_CARDTODECK:
      const { title, card } = action
      return {
        ...state,
        [title]: {
                ...state[title],
                cards:[...state[title]['cards'].concat(card)]
              }
    }
    case QUIZ_DECKCARD :
        return  {
          ...state,
          [action.deck.title]:action.deck
      }

    case REMOVE_DECK :
      //retrieve from state
      const mydecks = state
      delete mydecks[action.title]
      return {
          ...mydecks
      }

    default :
      return state
  }
}

 
export default decks

 