export default async function createElement(url, elementToBeCreated) {
	const response = await fetch(url,
		{
		  method: "POST",
		  headers: { "content-type": "application/json" },
		  body: JSON.stringify(elementToBeCreated),
		}
	);
	console.log("Creating status:", response.status)
	return response.status
}