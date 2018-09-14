var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    agent = request.agent(app);

describe('Get Acccount Integration Test', function(){
    it('Should just work', function(done){
        agent.get('/api/account/234')
            .expect(200)
            .end(function(err, results){

                results.body.checking.balance.should.greaterThan(0)
                results.body.investments.balance.should.greaterThan(0)
                results.body.lines_of_credit.balance.should.lessThan(0)

                done();
            })
    })


})