pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
})

pm.test("Response returns an event", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.event).to.be.a('object');
})

pm.test("Response contains the event ID", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.event.event_id).to.be.a('integer');
})
pm.test("Response contains the event start date", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.event.start).to.be.a('string');
})
pm.test("Response contains the event end date", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.event.end).to.be.a('string');
})
pm.test("Response contains cancellation details", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.event.is_cancelled).to.be.a('boolean');
})
pm.test("Response contains the event location", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.event.location).to.be.a('string');
})
pm.test("Response contains the event online location", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.event.online_location).to.be.null;
})
pm.test("Response contains online details", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.event.is_online).to.be.a('boolean');
})
pm.test("Response contains the event description", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.event.description).to.be.a('string');
})
pm.test("Response contains the event RSVP details", function(){
    var jsonData = pm.response.json();
    pm.expect(jsonData.event.rsvp).to.be.null;
})







