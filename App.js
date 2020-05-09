import React, { Component } from 'react'
import {createStore} from  'redux'
import middleware from './middleware'
import {Provider} from 'react-redux'
import reducer from './reducers'
import WrappedApp from './WrappedApp';
import { setLocalNotification } from './utils/setLocalNotification';

export default class App  extends Component {
    
  componentDidMount()
  {
     // notification
     setLocalNotification();
  }

    render(){
        return (
            <Provider store={createStore(reducer, middleware)}>
               <WrappedApp/>
           </Provider>
         )
    }
}