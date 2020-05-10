import { clearDeckQuiz}  from '../utils/helpers'
import { _receiveDecks}  from './decks'
export const CLEAR_DECKQUIZ='CLEAR_DECKQUIZ'
//export const SET_ACTIVEDECK='SET_ACTIVEDECK'

//set ActiveDeck
// export function _setActiveDeck(deck){
//     return {
//       type:SET_ACTIVEDECK,
//       activeDeck: deck
//     }
// }

function _clearDeckQuiz(deck){
  return {
    type:CLEAR_DECKQUIZ,
    deck: deck 
  }
}

//clear answers for all quizs in this deck
export function handleClearQuizAnswers(title){
  return (dispatch, getState) => {
    const {decks} = getState()
    if(decks) {
      return  clearDeckQuiz(title).then(
        (decks) =>{
          dispatch(_clearDeckQuiz (decks[title])) 
          dispatch(_receiveDecks(decks)) 
        }
      )
    }
    else{
      console.log("handleClearQuizAnswers...no deck with title:", title)
    }
  }
}
// //there is no DB/storage...just state
// export  function handleSetActiveDeck(title){
//   return (dispatch, getState) => {
//     const {decks} = getState()
//     //any decks at all?
//     if(decks && decks[title] ) {
//       return  dispatch(_setActiveDeck(decks[title])) 
//     }
//     else{
//       console.log("Error set active deck...no deck with title:", title)
//     }
//   }
// }