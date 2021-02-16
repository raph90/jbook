import React from 'react';
import ReactDOM from 'react-dom';
import CodeCell from './components/code-cell';

function App() {

  // ${code}
  return (
    <div>
      <CodeCell />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
