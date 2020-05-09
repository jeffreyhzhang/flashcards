import React, { Component } from 'react'
import {   Platform, Text,   View, SafeAreaView, ScrollView,   } from "react-native";
import { connect } from 'react-redux'
import DeckElement from './DeckElement'
import {handlereceiveDecks} from '../actions/decks'
import {styles} from '../utils/AppStyles'
import Header from './Header'
import { FontAwesome, Icon } from '@expo/vector-icons';
 
 function Separator() {
    return <View style={styles.separator} />;
  }
  
   
 class DeckList extends Component {

    goHome =(nav) =>{
      nav.navigate('AddDeck')
    }
    
    componentDidMount(){
       this.props.dispatch(handlereceiveDecks())
    } 
 
    render() {
        const { decks, navigation } = this.props;
 
        if(decks && Object.keys(decks) && Object.keys(decks).length>0) {
        return (
            <SafeAreaView>
              <Header/>
              <View style ={styles.container}>
                <Text style={styles.xlargeText}>  { Object.keys(decks).length } {Object.keys(decks).length>1 ? 'Decks': 'Deck'}  </Text>
              </View>
            <ScrollView style={styles.scrollView}>
              {
                  Object.keys(decks).map( (item) =>
                    <View key={item} >
                      <DeckElement   key={item} decktitle = {decks[item].title}  NbrofCards={decks[item].cards.length} navigation = {this.props.navigation} ></DeckElement> 
                      <Separator/>
                    </View>
                  )
              }
            </ScrollView> 
            </SafeAreaView>
          )
        }
        else
        {  
            return (
                <View style={styles.container}>
                    <Text style={styles.largeText}> You don not have any deck!</Text>
                    <Separator/>
                    <FontAwesome.Button  name="lock"  backgroundColor="#3b5998"    onPress = {() => this.goHome(navigation)} > Try Add a New Deck</FontAwesome.Button>
                </View>
            )
        }
    }
}

// const  mapStateToProps = state => ({
//     decks: state.decks
// })
 
function mapStateToProps(state){
    return {
        decks: state.decks
    }
  }
export default connect(mapStateToProps)(DeckList)