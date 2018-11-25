import React from 'react';
import Stack from './components/Stack'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {scheduleNotification, notificationScheduled} from './utils/storage'
import decks from './reducers'

class App extends React.Component {

  componentDidMount(){
    notificationScheduled()
    .then((notificationSet) => {
      if(notificationSet === false){
        scheduleNotification()
      }else{
        console.log('Notification already set')
      }
    })
   
  }
  render() {
    return (
      <Provider store={createStore(decks)}>
        <Stack/>
      </Provider>
    );
  }
}

export default App;
