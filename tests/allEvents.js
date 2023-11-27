pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});

pm.test("Response returns array of events", function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.events).to.be.an("array");
});
