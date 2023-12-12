// Test case to check if the response has a valid status code (assuming 200 is expected)
pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

// Test case to ensure the response contains an string uid
pm.test("Response contains an array of categories", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.uid).to.be.an('string');
});


pm.test("Response returns array of categories of events", function(){
    var jsonData = pm.response.json();
    tests["Second element is a dictionary"] = typeof jsonData[1] === 'string';
})

