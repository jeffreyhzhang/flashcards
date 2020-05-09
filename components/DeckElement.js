import React, { Component } from 'react'
import {  Platform, StyleSheet, Text, TouchableOpacity,  View, } from "react-native";
 import { connect } from 'react-redux'
import {handleSetActiveDeck} from '../actions/activeDeck'
import { FontAwesome } from '@expo/vector-icons';
import {  white } from '../utils/colors';

class DeckElement extends Component {
 
    gotoDeck = () =>
    {
        //set activeDeck  to decktitle
        this.props.dispatch(handleSetActiveDeck(this.props.decktitle))
        //navigate to Deck screen
         this.props.navigation.navigate('Deck')
    }
    
    render() {
        const {decktitle,NbrofCards, navigation} = this.props
        // we need set activedeck before we naviaget to Deck
        return (
                <TouchableOpacity style={styles.container} underlayColor='red' onPress = {() => this.gotoDeck()}>
                      <View style={styles.contentContainer}>
                        <Text style={styles.title}>
                              {decktitle} Deck
                        </Text>
                       { (NbrofCards)  &&    <Text style={styles.countText}>  {NbrofCards>1? ` ${NbrofCards} Cards`:`${NbrofCards}  Card`}  </Text>   }
                    </View>
                    
                    <FontAwesome
                      name="chevron-right"
                      style={styles.rightArrow}
                      size={18}
                    />
                  
                </TouchableOpacity>
         )
    }
}
 

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#28A745' 
  },
  contentContainer: {
    flex: 1
  },
  title: {
    fontSize: 22,
    color: white
  },
  createdText: {
    fontSize: 14,
    color: white
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 16
  },
  countText: {
    fontSize: 28,
    color: white
  },
  countLabel: {
    marginLeft: 5,
    marginBottom: 2,
    fontSize: 22,
    color: '#ffffffcc'
  },
  rightArrow: {
    color: white
  }
});

  
 
export default connect()(DeckElement)