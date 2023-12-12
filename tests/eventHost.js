pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
})

pm.test("Response returns event host name", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.org_name).to.be.a('string');
})
