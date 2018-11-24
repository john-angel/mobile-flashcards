import React from 'react';
import Stack from './components/Stack'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'

class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <Stack/>
      </Provider>
    );
  }
}

export default App;
