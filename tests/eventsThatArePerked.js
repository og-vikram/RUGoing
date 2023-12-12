// Check if the response has a valid status code
pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

// Check if the response contains an array of categories
pm.test("Response contains an array of categories", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
});

pm.test("Response contains category_id", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData[0].category_id)
});


pm.test("Response contains category_id", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData[0].events).to.be.an('array')
});

