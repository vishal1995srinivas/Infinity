async function getDataById(url = '', token) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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
async function DeleteCollectionById(token, collectionId) {
	try {
		let deleteCollection = await getDataById(`http://localhost:5000/api/v1/collections/${collectionId}`, token);
		console.log(deleteCollection);
	} catch (error) {
		return error;
	}
}

export default DeleteCollectionById;
