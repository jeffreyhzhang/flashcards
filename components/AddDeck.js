import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Platform,  Text, TextInput, TouchableOpacity, View} from "react-native";
import {handleaddDeckTitle,  } from '../actions/decks'
import {styles} from '../utils/AppStyles'

class AddDeck extends Component {
    state = {
        title:''
    }
 
    handleTitle = text => {
        this.setState({ title: text });
    };
 
    submit = () => {
        const {title} = this.state
        if(title.length >1 )
        { 
            //  clear input for next time
            this.setState({ title:''})
            
            this.props.dispatch(handleaddDeckTitle(title))

            //set this newly created  deck as active deck
            //this.props.dispatch(handleSetActiveDeck(title))
            this.props.navigation.navigate('Deck',{decktitle : title})

            // Navigate to  AddCard with title as route with params
            //this.props.navigation.navigate('AddCard',  { decktitle : title})
        }
    }

    render() {
     
        return (
            <View style={styles.container}>
                <Text>Please enter the Title of the new deck</Text>
                <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Title"
                placeholderTextColor="black"
                autoCapitalize="none"
                value={this.state.title}
                onChangeText={this.handleTitle}
                />
 
                <TouchableOpacity
                style={styles.submitButton}
                onPress={ this.submit}
  
                >
                <Text style={styles.submitButtonText}> Create Deck </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect()(AddDeck)