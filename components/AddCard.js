import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Platform,  Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView} from "react-native";
import {handleaddCardToDeck} from '../actions/decks'
import {styles} from '../utils/AppStyles'
 
class AddCard extends Component {
    state = {
        question:'',
        answer: '',
        decktitle:''
    }
 
    handleQuestion = text => {
        this.setState({ question: text });
    };

    handleAnswer = text => {
        this.setState({ answer: text });
    };

    //after save card, go back to DeckList
    saveCard = ( )=>{
        //no cardid yet??
        const {  route } = this.props;
        const { decktitle } = route.params;
 
        const Q =   this.state.question
        const A =  this.state.answer
 
        if( Q.length>2 && A.length>2){
            const  card = {question:Q, answer:A, quiz:null}
            this.props.dispatch( handleaddCardToDeck(decktitle,card) )
            this.props.navigation.navigate('Decks')
        }
    };

    render() {
        const {  route } = this.props;
        const { decktitle } = route.params;
       
        return (
            <KeyboardAvoidingView  behavior ='padding' style={styles.container}>
                { (this.state.question.length<3 || this.state.answer.length<3)  &&
                    <View>
                    <Text  style={styles.title}>Min 3 characters required for any question or answer</Text>
                    </View>
                }
                <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Question"
                placeholderTextColor="black"
                autoCapitalize="none"
                onChangeText={this.handleQuestion}
                />
                <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Answer"
                placeholderTextColor="black"
                autoCapitalize="none"
                secureTextEntry={false}
                onChangeText={this.handleAnswer}
                />
                <TouchableOpacity
                style={styles.submitButton}
                onPress={ this.saveCard } 
                >
                <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

 
export default connect()(AddCard)