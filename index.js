'use strict';
const path = require('path');
const uid2 = require('uid2');
const tempDir = require('temp-dir');
const makeDir = require('make-dir');

function thunk(uniqueDir) {
	return function () {
		const args = Array.prototype.slice.call(arguments);
		args.unshift(uniqueDir);
		return path.join.apply(path, args);
	};
}

module.exports = options => {
	options = options || {};

	const uniqueDir = path.join(tempDir, uid2(options.length || 20));

	if (options.create) {
		makeDir.sync(uniqueDir);
	}

	if (options.thunk) {
		return thunk(uniqueDir);
	}

	return uniqueDir;
};
