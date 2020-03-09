async function FetchData(url = '', data = {}, method, myHeaders) {
	// Default options are marked with *
	setTimeout(async () => {
		const response = await fetch(url, {
			method: method, // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: myHeaders,
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *client
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		});
		return await response.json();
	}, 5000); // parses JSON response into native JavaScript objects
}
export default FetchData;
