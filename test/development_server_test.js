var expect = require('chai').expect
var enduro = require('../index')
var request = require('request')

describe('Development server', function () {

	// Create a new project
	before(function (done) {
		enduro.run(['create', 'testproject_server'])
			.then(() => {
				// navigate inside new project
				global.CMD_FOLDER = CMD_FOLDER + '/testproject_server'
				enduro.run([], ['nr'])
					.then(() => {
						setTimeout(done, 150)
					})
			}, () => {
				done(new Error('Failed to create new project'))
			})
	})

	it('should serve something on port 3000', function (done) {
		request('http://localhost:3000/', function (error, response, body) {
			if (error) { console.log(error) }
			expect(body).to.contain('body')
			expect(body).to.contain('head')
			expect(body).to.contain('title')
			done()
		})
	})

	it('should serve something on port 5000', function (done) {
		request('http://localhost:5000/', function (error, response, body) {
			if (error) { console.log(error) }
			expect(body).to.contain('body')
			expect(body).to.contain('head')
			expect(body).to.contain('title')
			done()
		})
	})

	it('should serve admin interface', function (done) {
		request('http://localhost:5000/admin', function (error, response, body) {
			if (error) { console.log(error) }
			expect(body).to.contain('body')
			expect(body).to.contain('head')
			expect(body).to.contain('ng-view ng-cloak')
			done()
		})
	})

	// navigate back to testfolder
	after(function (done) {
		enduro.server_stop(() => {
			global.CMD_FOLDER = process.cwd() + '/testfolder'
			done()
		})
	})

})
