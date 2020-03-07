async function getData(url = '', token) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
			'x-access-token': token
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer' // no-referrer, *client
		//body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return await response.json(); // parses JSON response into native JavaScript objects
}
async function getDataById(url = '', token) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
			'x-access-token': token
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer' // no-referrer, *client
		//body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return await response.json(); // parses JSON response into native JavaScript objects
}
async function getCollections(userId, token) {
	let url = `http://localhost:5000/api/v1/collections?userId=${userId}`;
	let Collections = await getData(url, token);
	let collections = [];

	if (Collections.data.collection.length > 0) {
		for (let i = 0; i < Collections.data.collection.length; i++) {
			let collection = {
				id: Collections.data.collection[i]._id,
				title: Collections.data.collection[i].title,
				requests: []
			};
			for (let j = 0; j < Collections.data.collection[i].requests.length; j++) {
				let request = await getDataById(
					`http://localhost:5000/api/v1/requests/${Collections.data.collection[i].requests[j]}`,
					token
				);
				collection.requests.push(request.data);
			}

			collections.push(collection);
		}
	}
	console.log(collections);
	return collections;
}
export default getCollections;
