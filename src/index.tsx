import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { StateProvider } from './store/store'

const container = document.getElementById('contents');

ReactDOM.render(
   <StateProvider>
     <App />
   </StateProvider>,
  container
);