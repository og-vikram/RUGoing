pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
})

pm.test("Response returns array of events", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
})

pm.test("Response returns event_id inside array", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData[0].event_id);
})

pm.test("Response returns theme_name inside array", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData[0].theme_name).to.be.an('string');
})

pm.test("Response returns events inside array", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData[0].events).to.be.an('array');
})

