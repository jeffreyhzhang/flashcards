import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { orange,white, bgBlueLight } from '../utils/colors';
import { FontAwesome } from '@expo/vector-icons';

export default function Header() {
  return (
    <View style={styles.headerPanel}>
  
      <FontAwesome
          name="lock"
          color={orange}
          size={48}
        />
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Mobile</Text>
        <Text style={styles.headerText}>Flashcards</Text>
        <Text style={styles.headerTagline}>The easy way to improve memory</Text>
      </View>
      <FontAwesome
         name="unlock"
         color={orange}
         size={48}
       />
    </View>
  );
}

const styles = StyleSheet.create({
  headerPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    height: 120,
    borderRadius: 20,
    backgroundColor: bgBlueLight
  },
  headerTextContainer: {
    flexDirection: 'column' // Swap from row back to the default of column
  },
  headerText: {
    textAlign: 'center',
    color: white,
    fontSize: 30
  },
  headerTagline: {
    textAlign: 'center',
    marginTop: 10,
    color: white,
    fontSize: 13
  }
});
