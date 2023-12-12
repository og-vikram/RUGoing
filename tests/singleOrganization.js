pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
})

pm.test("Response returns an organization", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.org).to.be.a('object');
})

pm.test("Response contains the organization ID", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.org.org_id).to.be.a('string');
})

pm.test("Response contains the organization name", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.org.name).to.be.a('string');
})

pm.test("Response contains the about property", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.org.about).to.be.a('string');
})

pm.test("Response has a contact property", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.org.contact).to.be.a('string');
})

pm.test("Response has a faq property", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.org.faq).to.be.a('string');
})