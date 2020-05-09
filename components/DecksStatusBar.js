import React from 'react';
import { StatusBar, View } from 'react-native';
import Constants from 'expo-constants';

function DecksStatusBar({backgroundColor,...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucentbackgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default DecksStatusBar;
