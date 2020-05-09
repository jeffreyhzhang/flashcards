import React, { Component } from 'react'
import { Platform, Text,  TouchableOpacity, View} from "react-native";
import { connect } from 'react-redux'
import {handleQuizCard, handlereceiveDecks} from '../actions/decks'
import {handleClearQuizAnswers} from '../actions/activeDeck'
import {styles} from '../utils/AppStyles'
import { FontAwesome } from '@expo/vector-icons';
import { setLocalNotification, clearLocalNotification } from '../utils/setLocalNotification';
class Quiz extends Component {

    state = {
      showQuestion : true,
      refreshme: false,
    }

    answerQuiz = (decktitle,   cardid, rightorWrong) =>{
        //if got it wirght, 'C', else 'W' for quiz entry
       this.props.dispatch( handleQuizCard(decktitle,cardid,rightorWrong) )
    }

    //flip question and answer
    flipQandA = () =>{
      this.setState({showQuestion: !this.state.showQuestion})
    }

    goHome =(nav) =>{
      //reset notification 
      clearLocalNotification().then(
          setLocalNotification()
        )

      nav.navigate('Decks')
    }
    
    ClearAnswers = (title,navigation) => {
      //null out all quiz for all cards in this deck 
      this.props.dispatch( handleClearQuizAnswers(title) )
     //  refresh this page ...decks not changed???
      this.setState({refreshme: true})
    }

    
    render() {
       const { route } = this.props;
       const {decks,navigation }  = this.props
 
       const {decktitle} = route.params;
       let reQuiz = this.state.refreshme?'Re-Quiz':'Quiz'
       let showQorA = this.state.showQuestion ? 'Answer':'Question'
       let deck = decks[decktitle]
    
       let totalcards = deck.cards.length
       let cardLefttoQuiz =  deck.cards.filter(item=>item.quiz===null).length
       let correctCt =  deck.cards.filter(item=>item.quiz==='C').length
       let wrongCt =  deck.cards.filter(item=>item.quiz==='W').length
       let score = 0.00
       if(cardLefttoQuiz < totalcards ) {
        score =  (correctCt*100.00/(correctCt + wrongCt)).toFixed(2);
       }

      const card =  deck.cards.find(item=>item.quiz===null)
  
      if(card === undefined) {
           //set notification if all 
           return (
           <View  style={styles.container}>
               <Text style={styles.xlargeText}>  {decktitle} Deck {reQuiz}</Text>
               <View style={styles.separator} />
               <FontAwesome.Button  name="rocket"  backgroundColor="#ff5998"  onPress = {() => this.ClearAnswers(decktitle,navigation) }> Restart Quiz </FontAwesome.Button>
               <Text style={styles.xlargeText}> Your score is: {score}%.</Text> 
               <View style={styles.separator} />
               <Text style={styles.TextStyle}> You answered {correctCt + wrongCt}  out of {totalcards}  cards.</Text>
               <View style={styles.separator} />
               <FontAwesome.Button  name="briefcase" backgroundColor="#3b5998"  onPress = {() => this.goHome(navigation) }> Go Home </FontAwesome.Button>
           </View>
           )
      }
      else{
          return (
            <View style={styles.container}> 
                <Text style={styles.xlargeText}> {reQuiz} {decktitle} Deck {this.state.showQuestion ? 'Question:' : 'Answer:'}  </Text>
                <Text style={styles.largeText}>  {this.state.showQuestion ? card.question : card.answer}  </Text>
                <Text style={styles.AnswerTextStyle} onPress={ ()=>  this.flipQandA()  }> {showQorA} </Text>
                {!this.state.showQuestion &&
                  <View style={{  flexDirection:"row" }}>
                  <TouchableOpacity
                    style={styles.btnCorrect}
                    onPress={() => this.answerQuiz(decktitle,  card.cardid ,'C')}
                    >
                    <Text style={styles.submitButtonText}> Correct </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnWrong}
                    onPress={() => this.answerQuiz(decktitle,  card.cardid ,'W')}
                    >
                    <Text style={styles.submitButtonText}> Wrong</Text>
                  </TouchableOpacity>
                </View>
              }
               <View style={{ flex: 1, flexDirection:"column", alignItems: 'center',justifyContent: 'center' }}>
                {(cardLefttoQuiz < totalcards)  && <Text style={styles.xlargeText}> Your score is: {score}%.</Text>}
                <Text style={styles.largeText}> You answered {correctCt + wrongCt}  out of {deck.cards.length}  cards.</Text>
              </View>
            </View>
        )
      }
   }       
}

 
function mapStateToProps(state ) {
    return {
        decks:  state.decks 
    }
  }
export default connect(mapStateToProps)(Quiz)