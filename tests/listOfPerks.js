pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

// Check if the response contains an array of perks
pm.test("Response contains an array of perks", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.perks).to.be.an('array');
});

// Check if the response contains perks with required attributes
pm.test("Perks contain 'id' and 'name'", function() {
    var jsonData = pm.response.json().perks;
    jsonData.forEach(function(perk) {
        pm.expect(perk.id).to.be.a('string');
        pm.expect(perk.name).to.be.a('string');
    });
});