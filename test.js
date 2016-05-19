import path from 'path';
import fs from 'fs';
import test from 'ava';
import osTmpdir from 'os-tmpdir';
import fn from './';

const tmpDir = osTmpdir();

test(t => {
	for (let i = 0; i < 100; i++) {
		const result = fn();
		t.is(result.indexOf(tmpDir), 0);
		t.true(result.length > tmpDir.length);
	}
});

test('default length is 20', t => {
	t.is(fn().length, (tmpDir + path.sep).length + 20);
});

test('can set custom length', t => {
	t.is(fn({length: 10}).length, (tmpDir + path.sep).length + 10);
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
