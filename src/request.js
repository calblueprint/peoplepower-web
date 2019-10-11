/* Helper functions intended to streamline our requests to the AirTable API. */ 

var Airtable = require('airtable');

// DO NOT COMMIT API KEY //
// DO NOT COMMIT API KEY //
// DO NOT COMMIT API KEY //
// DO NOT COMMIT API KEY //
// DO NOT COMMIT API KEY //
// DO NOT COMMIT API KEY //
// DO NOT COMMIT API KEY //
// DO NOT COMMIT API KEY //
// DO NOT COMMIT API KEY //
// DO NOT COMMIT API KEY //
// DO NOT COMMIT API KEY //
// DO NOT COMMIT API KEY //


// API KEY will reside in ENV variables later.
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: ''
});

const base = Airtable.base('appFaOwKhMXrRIQIp');

// Given a table and record ID, return the fields (an object) 
function getRecordFromID(table, id) {
	base(table).find(id, function(err, record) {
	    if (err) { console.error(err); return; }
	    console.log('Retrieved', record.get('ID'), record.fields);
	});
}

function getRecordFromName(table, name) {
	console.log(`Searching for ${name}`)
	var id = base(table).select({
		view: "Grid view",
		maxRecords: 1,
	    filterByFormula: `SEARCH(LOWER("${name}"), LOWER(Name))`
	}).firstPage(function(err, records) {
	    if (err) { console.error(err); return; }
	    records.forEach(function(record) {
	        console.log('Retrieved', record.get('Name'), record.fields);
	    });
	});
}

// CRUD stuff except for Delete
// make some wrappers

export { getRecordFromID, getRecordFromName };
