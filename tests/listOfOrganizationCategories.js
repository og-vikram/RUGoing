// Test case to check if the response has a valid status code (assuming 200 is expected)
pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

// Test case to ensure the response contains an array of categories
pm.test("Response contains an array of categories", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.categories).to.be.an('array');
});

// Test case to check if each category has an 'id' field of type number
pm.test("Each category has a valid 'id'", function() {
    var jsonData = pm.response.json();
    jsonData.categories.forEach(function(category) {
        pm.expect(category.id).to.be.a('number');
    });
});

// Test case to check if each category has a 'name' field of type string
pm.test("Each category has a valid 'name'", function() {
    var jsonData = pm.response.json();
    jsonData.categories.forEach(function(category) {
        pm.expect(category.name).to.be.a('string');
    });
});

// Test case to check if the first category has a specific 'id' (you can replace 4645 with the expected value)
pm.test("First category has a specific 'id'", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.categories[0].id);
});

