import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import * as esbuild from 'esbuild-wasm';

function App() {
  const ref = useRef<any>();
  //input
  const [input, setInput] = useState('');
  // output
  const [code, setCode] = useState('');

  useEffect(() => {
    startService();
  }, []);
  //handler
  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    });

    setCode(result.code);
  };

  const startService = async () => {
    // the initialization
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
  };

  return (
    <div>
      <textarea
        name=""
        id=""
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
