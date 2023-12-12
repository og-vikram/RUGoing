pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
})

pm.test("Response returns a user", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.user).to.be.a('object');
})

pm.test("Response contains the user ID", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.user.user_id).to.be.a('string');
})
pm.test("Response contains the netid", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.user.netid).to.be.a('string');
})
pm.test("Response contains the username", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.user.username).to.be.a('string');
})
pm.test("Response contains firstname", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.user.firstname).to.be.a('string');
})
pm.test("Response contains the lastname", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.user.lastname).to.be.a('string');
})
pm.test("Response contains their officer status", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.user.isOfficer).to.be.a('boolean');
})
pm.test("Response contains organization", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.user.organization);
})







