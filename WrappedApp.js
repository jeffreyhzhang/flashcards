import React, {Component} from 'react';
import { View ,Platform } from 'react-native';
import { handleinitDecks, handleclearDecks} from './actions/decks'
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import AddDeck from './components/AddDeck'
import DeckList from './components/DeckList'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import Deck from './components/Deck'
import DecksStatusBar from './components/DecksStatusBar'
import {white,bgBlue ,bgBlueLight} from './utils/colors'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Decks'

  switch (routeName) {
    case 'AddDeck':
      return 'AddDeck'
    case 'Decks':
      return 'Decks'
    case 'Quiz':
      return 'Quiz'
    case 'AddCard':
      return 'AddCard'
    case 'Deck':
        return 'Deck'
  }
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Platform.OS === 'ios' ?  bgBlue : white,
        style: {
          height: 56,
          backgroundColor: Platform.OS === 'ios' ? '#FAFAFA' : bgBlueLight,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }
      }}
      >
        
      <Tab.Screen name='Decks' component={DeckList} 
           options={{
            tabBarLabel: 'Decks',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="briefcase" color={color} size={size} />
            ),
          }}
      />

      <Tab.Screen name='AddDeck' component={AddDeck}         
          options={{
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="plus-square" color={color} size={size} />
            ),
          }}
     />
    </Tab.Navigator>
  )
}

function AppNav() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#101010' //purple //
          },
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTintColor: '#ffd700', //white,  
          headerBackTitleVisible: false,
        }}
        headerMode='float'>
        <Stack.Screen
          name='Home'
          component={MainTabNavigator}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route)
          })}
        />

        <Stack.Screen
          name='AddCard'
          component={AddCard}
          options={({ route }) => ({
            title: 'myDeckID',    //so we get it via const { title } = route.params;
            headerTitle: getHeaderTitle(route)
          })}
        />
        <Stack.Screen
          name='DeckList'
          component={DeckList}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route)
          })}
        />

        <Stack.Screen
          name='Quiz'
          component={Quiz}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route)
          })}
        />

        <Stack.Screen name="Deck" component={Deck}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}


 class WrappedApp extends Component {
  componentDidMount() {
    //get decks
     if (this.props.clearAllDecks){
      this.props.dispatch(handleclearDecks())
     } 
     this.props.dispatch(handleinitDecks())
  }
  //
  //backgroundColor: Platform.OS === 'ios' ? '#FAFAFA' : bgBlue,
  // '#ee0000'
  render() {
    return (
          <View style={{ flex: 1 }}>
            <DecksStatusBar barStyle="light-content" backgroundColor='#ee0000' />
            <AppNav/>
          </View>
    )
  }
}

 
//do I need anything as prop
const mapStateToProps = function(state) {
  return {
    clearAllDecks:false
  }
}
export default  connect(mapStateToProps)(WrappedApp) 