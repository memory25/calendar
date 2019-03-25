import React, {useCallback} from 'react';
import {render} from 'react-dom';
import Calendar from './js/Calendar';

import './sass/main.sass';

function App() {
  const onSelect = useCallback(date => {
    console.log(date);
  });
  return <Calendar date={new Date()} onSelect={onSelect} />;
}

const DOMrender = () => render(<App />, document.getElementById('root'));

DOMrender();

if (module.hot) {
  module.hot.accept();
}
