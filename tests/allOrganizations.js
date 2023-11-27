pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});

pm.test("Response returns array of organizations", function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.orgs).to.be.an("array");
});

pm.test("Response returns all 889 organizations at Rutgers", function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.orgs).to.contain.lengthOf(889);
});
