import {orange, lightGreen, blue,white,textGray,textColor} from './colors'
import {  StyleSheet } from "react-native";
export  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },

    input: {
        margin: 15,
        height: 40,
        width: 360,
        borderColor: "black",
        borderWidth: 1
    },

    submitButton: {
        padding: 10,
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#28A745'
    },

    btnCorrect: {
        padding: 10,
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#28A745'
      },
      
    btnWrong: {
        padding: 10,
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#DC3545'
      },

    AnswerTextStyle: {
        color: '#E91E63',
        justifyContent: 'center',
        textDecorationLine: 'underline'
    },

    submitButtonText: {
        color: "white"
    },

    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    largeText: {
        marginTop: 8,
        marginBottom: 20,
        fontSize: 20,
        color: textColor
    },
    xlargeText: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 32,
        fontWeight:"bold",
        color: textColor
    },

    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
  });
