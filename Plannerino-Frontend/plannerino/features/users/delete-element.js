  export default async function deleteElement(url) {
	const response = await fetch(
		url,
		{
		  method: "DELETE",
		}
	  );
	console.log("Deleting status:", response.status)
	return response.status
}