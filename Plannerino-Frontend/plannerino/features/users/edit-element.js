export default async function editElement(url, elementToBeUpdated) {
	const response = await fetch(url,
		{
		  method: "PUT",
		  headers: { "content-type": "application/json" },
		  body: JSON.stringify(elementToBeUpdated),
		}
	);
	console.log(response.status)
	return response.status
}