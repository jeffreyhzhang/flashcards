import {AsyncStorage} from 'react-native'
//import { AsyncStorage } from '@react-native-community/async-storage'
export const STORAGE_KEY='@FlashCards:DECKKEY'

//get all decks
export  async function getDecks(){
    try{
        const ret = await  AsyncStorage.getItem(STORAGE_KEY)
        return  JSON.parse(ret)
    }catch(error){
        console.log("get all decks error",error.message)
    } 
    return null 
}

//get speific Deck..if invalidid is passed in
export  async function getDeck(title){
    try{
        const ret = await  AsyncStorage.getItem(STORAGE_KEY)
        const data =  JSON.parse(ret)
        if(data && data[title]) {
            return data[title]
        }
        else{
            console.log("get nothing for deck ",title )
        }          
    }catch(error){
        console.log("get deck error",error.message)
    } 
    return null
}

//saveDeckTitle...create a new deck
// if already there, just return the deck...case sensitive?
export async function saveDeckTitle(title){
    try{
        const ret = await  AsyncStorage.getItem(STORAGE_KEY)
        const data =  JSON.parse(ret)
        if(data && data[title]){
            console.log("deck already exists!", data[title])
            return data[title]
        }
        else{
            const newdeck = {
              [title]:{ 
                      title: title,
                      cards:[]
                  }
            }
            const res =  await  AsyncStorage.setItem(STORAGE_KEY,
                JSON.stringify( newdeck))
            return  newdeck
        }
    }catch(error){
            console.log("save deck error",error.message)
    } 
    return null
}
 
export async function addCardToDeck(title, card){
    try{
       const  results =  await AsyncStorage.getItem(STORAGE_KEY)
       const data =  JSON.parse(results)
      if(data && data[title]) {
        //add card to deck
        data[title]['cards'].push({...card })
        await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(data))
        return data 
      }
    }catch(error){
        console.log("addCardToDeck  error",error.message)
    } 
 
    return null
}

//remove deck with title (key) 
export async function removeDeck(title) {
    try{
          const ret = await AsyncStorage.getItem(STORAGE_KEY)  
          const data =  JSON.parse(ret)
          data[title] = undefined
          delete data[title]
          return await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }catch(error){
        console.log("removeDeck error",error.message)
    } 
    return null
  }
 

  //null out all quiz for this deck
  export async function clearDeckQuiz(title) {
    try{
          const ret = await AsyncStorage.getItem(STORAGE_KEY)  
          const data =  JSON.parse(ret)
 
          data[title].cards.forEach((item, idx) =>
            {
              data[title].cards[idx].quiz = null
            }
          )
 
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
          return data 
    }catch(error){
        console.log("clearDeckQuiz error",error.message)
    } 
    return null
  }

  //clear all from device
  export async function clearDecks()
  {
    return  await AsyncStorage.clear()
  }

  //save quiz  to card of the deck
  export async function quizDeckCard(title,cardid,quiz)
  {
    try{ 
      const ret = await  AsyncStorage.getItem(STORAGE_KEY)
      const data =  JSON.parse(ret)
 
      if(data && data[title]) {
 
          let idx = data[title].cards.findIndex((x)=>x.cardid === cardid)
 
          if( idx>=0 ) {
            data[title].cards[idx].quiz = quiz
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
            return data[title] 
          }
          else{
            console.log('quiz result to card failed!!!!')
          }
        }
    }
    catch(error){
      console.log("quiz result to card failed with error",error.message)
    }
    return null
  }

  //Some initial data
  export  async function initDecks(){
      const decks =   {
        React: {
          title: 'React',
          cards: [
            {
              cardid:'5i2ok3ym7mf1p33lnea',
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
              quiz:'C'
            },
            {
              cardid:'4i3ok3ym7mf1p33lneb',
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event',
              quiz:null
            }
          ]
        },
        JavaScript: {
          title: 'JavaScript',
          cards: [
            {
              cardid:'6i4ok3ym7mf1p33lnec',
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.',
              quiz:'W'
            }
          ]
        }
    } 
   //save to storeage
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    //await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks))
    return decks;
  }

