import React from 'react';
import Stack from './components/Stack'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import decks from './reducers'

class App extends React.Component {

  store = createStore(decks)
  
  render() {
    return (
        <Provider store={this.store}>
          <Stack/>
        </Provider>      
    );
  }
}

export default App;
