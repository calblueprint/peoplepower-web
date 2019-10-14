import key from './api_key.js';
/* Helper functions intended to streamline our requests to the AirTable API. */ 

var Airtable = require('airtable');

// API KEY will reside in ENV variables later.
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: key
});

const base = Airtable.base('appFaOwKhMXrRIQIp');

// ******** READ RECORDS ******** //

// Given a table and record ID, return the fields (an object) 
function getRecordFromID(table, id) {
	base(table).find(id, function(err, record) {
	    if (err) { console.error(err); return; }
	    console.log('Retrieved', record.get('ID'), record.fields);
	    return record.fields;
	});
}

/* Note: the following two functions, getRecordFromName and getRecordFromEmail
are 'Person' table specific. */

function getRecordFromName(table, name) {
	console.log(`Searching for ${name}`)
	base(table).select({
		view: "Grid view",
		maxRecords: 1,
	    filterByFormula: `SEARCH(LOWER("${name}"), LOWER(Name))`
	}).firstPage(function(err, records) {
	    if (err) { console.error(err); return; }
	    if (records.length < 1) {
	    	console.log('No record was retrieved using this name.')
	    	return 0;
	    }
	    records.forEach(function(record) {
	        console.log('Retrieved', record.get('Name'), record.fields);
	        return record
	    });
	});
}


function getRecordFromEmail(table, email) {
	console.log(`Searching for ${email}`)
	base(table).select({
		view: "Grid view",
		maxRecords: 1,
	    filterByFormula: `{Email}='${email}'`
	}).firstPage(function(err, records) {
	    if (err) { console.error(err); return; }
	    if (records.length < 1) {
	    	console.log('No record was retrieved using this email.')
	    	return 0;
	    }
	    records.forEach(function(record) {
	        console.log('Retrieved', record.get('Name'), record.fields, 'given email.');
	        return record
	    });
	});
}


// ******** CREATE RECORDS ******** //

/* 
	You can pass in UP TO 10 record objects. Each obj should have one key, fields,
 	contailing all cell values by field name. Linked records are represented as an array of IDs.
 */

// Given a person object, create a record of that person
function createPerson(person) {

	// deconstruct person obj parameter
	// let { "Email": email, "Phone Number" : phoneNumber, "Owner": owner, 
	// "Address": address, "Tags": tags, "User Login" : userLogin, "Name": name } = person.fields

	// {
	// 	"fields": {
	// 	  "Email": email,
	// 	  "Phone Number": phoneNumber,
	// 	  "Owner": [owner],
	// 	  "Address": [address],
	// 	  "Tags": tags,
	// 	  "User Login": [userLogin],
	// 	  "Name": name
	// 	}
	// }

	base('Person').create([person], function(err, records) {
		if (err) {
			console.error(err);
			return;
		}
		records.forEach(function (record) {
			console.log(`Successfully created ${record.get('Name')} (${record.getId()})'s record.`);
		});
	});
}

// ******** UPDATE RECORDS ******** //

/* 
	An UPDATE will only update the fields you specify, leaving the rest as they were. 
	A REPLACE will perform a destructive update and clear all unspecified cell values. 

	- Max 10 records to be updated at once.
	- Each obj should have an ID key and a fields key.

	// {
	//   "id": "recfnsL4HDoNHril6",
	//   "fields": {
	//     "Email": "nickwong@berkeley.edu",
	//     "Phone Number": "(504) 123-4567",
	//     "Owner": [
	//       "recsnkM5ms2NJhVW0"
	//     ],
	//     "Address": [
	//       "reci2wCQQ5HnL5r4A"
	//     ],
	//     "Tags": 112,
	//     "User Login": [
	//       "rec9ycakLxIUbTLef"
	//     ],
	//     "Name": "Nick Wong"
	//   }
	// }

*/

function updatePerson(updatedPerson) {
	base('Person').update([updatedPerson], function(err, records) {
		if (err) {
			console.error(err);
			return;
		}
		records.forEach(function(record) {
			console.log(record.get('Email'));
		});
	});
}


export { getRecordFromID, getRecordFromName, getRecordFromEmail, createPerson, updatePerson };
