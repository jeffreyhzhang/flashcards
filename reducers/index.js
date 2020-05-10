
import {GET_DECK, RECEIVE_DECKS,ADD_DECKTITLE,ADD_CARDTODECK,REMOVE_DECK,INIT_DECKS,CLAER_DECKS} from '../actions/decks'
import { combineReducers } from 'redux'
import decks from './decks'
import activeDeck from './activeDeck'
import clearQuiz from './clearQuiz' 
export default combineReducers({
    decks,
    activeDeck,
    clearQuiz,
})

