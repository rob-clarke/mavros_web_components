import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'roslib.phony.js',
  output: {
    file: 'static/web_modules/roslib.js',
    format: 'es'
  },
  plugins: [resolve({browser:true}), commonjs()]
};