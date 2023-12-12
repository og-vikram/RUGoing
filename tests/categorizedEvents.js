// Test case to check if the response has a valid status code (assuming 200 is expected)
pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

// Test case to ensure the response contains a dictionary of categorized events
pm.test("Response contains an array of categories", function() {
    var jsonData = pm.response.json();
    tests["First element is a dictionary"] = typeof jsonData[0] === 'object';
});




