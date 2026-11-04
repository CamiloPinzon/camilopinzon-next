'use strict';

// minimatch@3 exports a callable function; minimatch@11 exports { minimatch }.
// This wraps v11 in the v3 shape so ESLint and its plugins run on the patched code.
const { minimatch, Minimatch } = require('minimatch-v11');

function compat(path, pattern, options) {
  return minimatch(path, pattern, options);
}

Object.assign(compat, minimatch);

// v11 dropped makeRe. Its only consumer here (eslint-plugin-import/no-internal-modules)
// just calls .test() on the result, so return a matcher with that interface.
compat.makeRe = function makeRe(pattern, options) {
  const mm = new Minimatch(pattern, options);
  return { test: (value) => mm.match(value) };
};

module.exports = compat;
