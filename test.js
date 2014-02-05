'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var dust = require('./index');

it('should precompile Dust templates', function (cb) {
	var stream = dust();

	stream.on('data', function (file) {
		assert.equal(file.relative, 'fixture/fixture.js');
		assert(/fixture\/fixture/.test(file.contents.toString()));
		cb();
	});

	stream.write(new gutil.File({
		base: __dirname,
		path: __dirname + '/fixture/fixture.html',
		contents: new Buffer('*foo*')
	}));
});

it('should support supplying custom name in a callback', function (cb) {
	var stream = dust(function (file) {
		return 'custom';
	});

	stream.on('data', function (file) {
		assert(/custom/.test(file.contents.toString()));
		cb();
	});

	stream.write(new gutil.File({
		base: __dirname,
		path: __dirname + '/fixture/fixture.html',
		contents: new Buffer('*foo*')
	}));
});
