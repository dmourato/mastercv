// vendor dependencies
var expect = require('chai').expect

describe('Files helper', function () {

	it('should list files successfully:', function () {
		expect(enduro.templating_engine.compileSync('{{#files "/../test"}} {{this}} {{/files}}')().split(' ')).to.be.instanceof(Array)
	})

})
