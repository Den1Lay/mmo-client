import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import store from '@/store'

import { Base } from '@/pages';

import 'antd/dist/antd.css';
import '@/styles/index.scss';

ReactDOM.render(
<Provider store={store}>
  <DndProvider backend={HTML5Backend}>
    <Router>
      <Route exact path='/' component={Base}/>
    </Router>
  </DndProvider>
</Provider>, 
document.querySelector('#app'));
