import path from 'path';
import fs from 'fs';
import test from 'ava';
import tempDir from 'temp-dir';
import fn from '.';

test(t => {
	for (let i = 0; i < 100; i++) {
		const result = fn();
		t.is(result.indexOf(tempDir), 0);
		t.true(result.length > tempDir.length);
	}
});

test('default length is 20', t => {
	t.is(fn().length, (tempDir + path.sep).length + 20);
});

test('can set custom length', t => {
	t.is(fn({length: 10}).length, (tempDir + path.sep).length + 10);
});

test('not created by default', t => {
	t.false(fs.existsSync(fn()));
});

test('can be created', t => {
	t.true(fs.existsSync(fn({create: true})));
});

test('can thunk', t => {
	const uniqueDir = fn({thunk: true});
	const base = uniqueDir();

	t.is(uniqueDir('foo'), base + path.sep + 'foo');
	t.is(uniqueDir('bar'), base + path.sep + 'bar');
});
