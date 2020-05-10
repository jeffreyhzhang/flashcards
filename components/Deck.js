import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Platform,  Text,   TouchableOpacity, View} from "react-native";
import {handleremoveDeck} from '../actions/decks' 
import {styles} from '../utils/AppStyles'

class Deck extends Component {
     
    // addcard
    addCard = (title) =>{
        this.props.navigation.navigate('AddCard', {decktitle: title})
    }
    //after delete deck...go to DeckList
    deleteDeck = (title)=>{
        this.props.dispatch( handleremoveDeck(title) )
        this.props.navigation.navigate('Decks')
    };

    startQuiz = (title)=>{
        //only if we have cards in deck
        this.props.navigation.navigate('Quiz', {decktitle: title,navigation:this.props.navigation })
    }


    render() {
        // check to see if we have cards for this deck
        //if no cards, disable start quiz btn
        const { activeDeck , route} = this.props
        let  decktitle  = ''
        if( route.params )
            decktitle  = route.params.decktitle;
        let title = (activeDeck && activeDeck.title) || decktitle

        //do we have any cards in active deck?
        //no need showing Quiz if no cards
 
        return (
            <View style={styles.container}>
                <TouchableOpacity
                style={styles.submitButton}
                onPress={() => this.addCard( title)}
                >
                <Text style={styles.submitButtonText}> Add Card </Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.submitButton}
                onPress={() => this.deleteDeck(title)}
                >
                <Text style={styles.submitButtonText}> Delete Deck </Text>
                </TouchableOpacity>
                { 
                activeDeck && activeDeck.cards && 
                    <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => this.startQuiz(title)}
                    >
                    <Text style={styles.submitButtonText}> Start Quiz </Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}
 
 
function mapStateToProps(state) {
    return {
        activeDeck: state.activeDeck
    }
  }
export default connect(mapStateToProps)(Deck)