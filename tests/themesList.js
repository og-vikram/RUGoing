// Test case to check if the response has a valid status code (assuming 200 is expected)
pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

// Test case to ensure the response contains an array of themes
pm.test("Response contains an array of themes", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.themes).to.be.an('array');
});

// Test case to check if each array has an 'id' field of type string
pm.test("Each category has a valid 'id'", function() {
    var jsonData = pm.response.json();
    jsonData.themes.forEach(function(theme) {
        pm.expect(theme.id).to.be.a('string');
    });
});

// Test case to check if each array has a 'name' field of type string
pm.test("Each category has a valid 'name'", function() {
    var jsonData = pm.response.json();
    jsonData.themes.forEach(function(theme) {
        pm.expect(theme.name).to.be.a('string');
    });
});



