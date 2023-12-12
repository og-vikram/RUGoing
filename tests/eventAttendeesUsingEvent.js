pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
})

pm.test("Response returns an event id", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.event).to.be.a('integer');
})

pm.test("Response returns an user attending event", function(){
    var jsonData = pm.response.json();
    tests["Second element is a dictionary"] = typeof jsonData[1] === 'object';
})

pm.test("Response returns total number of users", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.event.total_users_count).to.be.a('integer');
})