
export const SET_ACTIVEDECK='SET_ACTIVEDECK'

//set ActiveDeck
export function _setActiveDeck(deck){
    return {
      type:SET_ACTIVEDECK,
      activeDeck: deck
    }
}

  
//there is no DB/storage...just state
export  function handleSetActiveDeck(title){
  return (dispatch, getState) => {
    const {decks} = getState()
    //any decks at all?
    if(decks && decks[title] ) {
      return  dispatch(_setActiveDeck(decks[title])) 
    }
    else{
      console.log("Error set active deck...no deck with title:", title)
    }
  }
}