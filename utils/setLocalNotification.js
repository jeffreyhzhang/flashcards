import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import { AsyncStorage } from 'react-native';
//import { AsyncStorage}  from '@react-native-community/async-storage'
const NOTIFICATION_KEY = '@FlashCards:LocalNotification';

export function getNotificationPermission(){
 
  Permissions.getAsync(Permissions.NOTIFICATIONS).then(
    (status) => {
 
      //if got permission
      if (status !== 'granted') {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then((status) => {
         //if got permission
 
         if (status === 'granted') {
              return true
         }
        })
      }
    }
  )
  return false;
}

 export function clearLocalNotification() {
   //do we have permission yet??
    if(getNotificationPermission()) { 
    return  AsyncStorage.removeItem(NOTIFICATION_KEY).then(
      Notifications.cancelAllScheduledNotificationsAsync()
    ) 
  }
}

 function createNotification() {
  return {
    title: 'Flashcard Quiz',
    body: '⏰ Don\`t forget to take a quiz today!',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
}

export  function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY) 
     .then(JSON.parse)
     .then((data) => {
        if (data === null && Permissions!==null) {
            try
            {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then((status) => {
                 //if got permission
                 if (status === 'granted') {
                     //clear all existing schedules if any
                 clearLocalNotification();
                 const nextNotificationTime = getNextDT();
                 //set next notification
                 Notifications.scheduleLocalNotificationAsync(
                     createNotification(),  { time: nextNotificationTime, repeat: 'day' }
                 );
                 //store in device
                 AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                 }
                })
            }catch(err) {
               console.log("error")
               alert( 'No Notification Permissions!' );
            }
        } 
      }
    )
}

function getNextDT() {
  let nextDT = new Date();
  nextDT.setDate(nextDT.getDate() + 1);
  nextDT.setHours(20,30,0);
  return nextDT;
}
