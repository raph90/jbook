/**
 * Wrap up logic around esbuild
 */

import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';

let service: esbuild.Service;

const bundler = async (rawCode: string) => {
  // at runtime we can assign the service, and then it's already initialised on later calls

  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  }
  try {
    const result = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      // we place the path plugin first,
      // because esbuild runs onResolve before onBuild
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });
    return {
code: result.outputFiles[0].text,
err: ''
    }
  } catch(err) {
    return {
      code: '',
      err: err.message
    }
  }

};

export default bundler; // initialise esbuild
// return the bundled code
