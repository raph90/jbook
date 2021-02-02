import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache',
});

export const unpkgPathPlugin = () => {
  // the returned object is the plugin
  return {
    // the name is just for debugging
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        // e.g "../"
        // check if we have a relative path or not
        if (args.path.includes('./') || args.path.includes('../')) {
          console.log('the args are', args);
          return {
            namespace: 'a',
            // args.resolveDir is where we found the last file
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + '/'
            ).href,
          };
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
                    import react from 'react' 
                    console.log(react);
                  `,
          };
        }

        // check to see if we've already fetched the file

        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        // if so, return it immediately
        // otherwise, fetch and store in cache
        if (cachedResult) {
          return cachedResult;
        } else {
          const { data, request } = await axios.get(args.path);
          const result: esbuild.OnLoadResult = {
            loader: 'jsx',
            contents: data,
            resolveDir: new URL('./', request.responseURL).pathname,
          };
          await fileCache.setItem(args.path, result);
          return result;
        }
      });
    },
  };
};
