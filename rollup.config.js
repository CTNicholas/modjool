import { nodeResolve } from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

const plugins = [
  nodeResolve(),
  babel({ 
    babelHelpers: 'bundled',
    presets: [
        ['@babel/preset-env', {
        targets: {
          chrome: 49, //49
          firefox: 45,
          opera: 41,
          safari: 10,
          edge: 19
        }
      }]
    ]
   }),
   terser()
]

// noinspection JSUnusedGlobalSymbols
export default [{
  input: {
    modjool: 'src/index-umd.js'
  },
  output: {
    dir: 'dist',
    format: 'umd',
    entryFileNames: '[name].umd.js',
    name: 'modjool',
    sourcemap: true,
    sourcemapFile: '[name].umd.js.map',
    compact: true
  },
  plugins
}, {
  input: {
    modjool: 'src/index-standard.js'
  },
  output: {
    dir: 'dist',
    format: 'iife',
    entryFileNames: '[name].js',
    name: 'modjool',
    sourcemap: true,
    sourcemapFile: '[name].js.map',
    compact: true
  },
  plugins
}, {
  input: {
    ['modjool-lite']: 'src/index-lite.js'
  },
  output: {
    dir: 'dist',
    format: 'iife',
    entryFileNames: '[name].js',
    name: 'modjoolLite',
    sourcemap: true,
    sourcemapFile: '[name].js.map',
    compact: true
  },
  plugins
}]
