import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

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

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      // we place the path plugin first,
      // because esbuild runs onResolve before onBuild
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });
    // console.log(result);

    setCode(result.outputFiles[0].text);
  };

  const startService = async () => {
    // the initialization
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg/esbuild-wasm@0.8.27/esbuild.wasm',
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
