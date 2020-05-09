import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Platform,  Text,   TouchableOpacity, View, Alert} from "react-native";
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
        this.props.navigation.navigate('Quiz', {decktitle: title,navigation:this.props.navigation })
    }


    render() {
        // check to see if we have cards for this deck
        //if no cards, disable start quiz btn
        const { activeDeck } = this.props
        let title = (activeDeck && activeDeck.title) ||''
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

                <TouchableOpacity
                style={styles.submitButton}
                onPress={() => this.startQuiz(title)}
                >
                <Text style={styles.submitButtonText}> Start Quiz </Text>
                </TouchableOpacity>
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