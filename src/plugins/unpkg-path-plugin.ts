import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  // the returned object is the plugin
  return {
    // the name is just for debugging
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // we can use multiple onResolves

      // this onResolve will be used just for index.js
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        // handle main 'index.js' entry point
        return {
          path: 'index.js',
          namespace: 'a',
        };
      });

      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        // handle relative paths in a module
        return {
          namespace: 'a',
          // args.resolveDir is where we found the last file
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
            .href,
        };
      });
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // handle main file of a module
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
