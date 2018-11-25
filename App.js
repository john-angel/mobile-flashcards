import React from 'react';
import Stack from './components/Stack'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import decks from './reducers'

class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(decks)}>
        <Stack/>
      </Provider>
    );
  }
}

export default App;
