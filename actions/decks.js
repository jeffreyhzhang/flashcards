import  {getDeck, getDecks, saveDeckTitle, addCardToDeck, removeDeck, initDecks, clearDecks, quizDeckCard} from '../utils/helpers'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECKTITLE = 'ADD_DECKTITLE'
export const ADD_CARDTODECK = 'ADD_CARDTODECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const INIT_DECKS='INIT_DECKS'
export const CLAER_DECKS='CLEAR_DECKS'
export const GET_DECK ='GET_DECK'
export const QUIZ_DECKCARD = 'QUIZ_DECKCARD'

export function _clearDecks(){
  return {
    type:CLAER_DECKS,
    decks:{}
  }
}

function _initDecks(decks){
  return {
    type:INIT_DECKS,
    decks,
  }
}


function _getDeck(deck){
  return {
    type:GET_DECK,
    deck,
  }
}

export function _receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

function _addDeckTitle (title) {
  return {
    type: ADD_DECKTITLE,
    title 
  }
}

function _addCardToDeck (title,card) {
    return {
      type: ADD_CARDTODECK,
      title,
      card,
    }
  }

function _removeDeck (title) {
    return {
      type: REMOVE_DECK,
      title,
    }
  }

  //QUIZ_CARD
function _quizDeckCard(deck){
  return {
    type: QUIZ_DECKCARD,
    deck
  }
}

//quizCard....deck:title,  card:card,  quiz:quiz
export  function handleQuizCard(title,cardid,quiz){
return (dispatch, getState) => {
  const {decks} = getState()
  //any decks at all?
  if(decks) {
    return quizDeckCard(title,cardid,quiz).then(
      (deck)=>{  //it item is not null, deck with title exists
          dispatch(_quizDeckCard (deck)) 
    })
  }
  else{
    console.log("Error set active deck...no deck with title:", title)
  }
}

}

////////////////for middleware /////////
//save to device, then update store
export function handleaddCardToDeck (title,card) {
  return (dispatch, getState) => {
   const  cardid = generateUID()
   card = {cardid:cardid,...card}
   return  addCardToDeck(title,card).then(
      (deck)=>{
        dispatch(_addCardToDeck (title,card))
       //once  add new card, we want trigger refresh
       //setTimeout( dispatch(_receiveDecks(decks)),300) 
      }
    )
  }
}
 
export function handleremoveDeck(title){
  return (dispatch, getState) => {
    return removeDeck(title).then(
      (item)=>{  //it item is not null, deleted ok
          dispatch(_removeDeck(title)) 
    })
  }
}
 
export function handleinitDecks(){
  return (dispatch) => {
   return initDecks().then((decks) =>
      dispatch(_initDecks(decks))
    )
  }
}

export function handlereceiveDecks(){
  return (dispatch, getState) => {
    return getDecks().then((decks) =>{
       dispatch(_receiveDecks(decks)) 
    })
  }
}

export function handleaddDeckTitle (title) {
  return (dispatch, getState) => {
    return saveDeckTitle(title).then((deck)=>{
       dispatch(_addDeckTitle(title)) 
    })
  }
}


export  function handleclearDecks(){
  return (dispatch) => {
   return  clearDecks().then(
      dispatch(_clearDecks())
    )
  }
}
 
export  function handlegetDeck(title){
  return (dispatch)=>{
    return getDeck(title).then(
      dispatch(_getDeck(title))
    )
  }
}

//for CardID
function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
