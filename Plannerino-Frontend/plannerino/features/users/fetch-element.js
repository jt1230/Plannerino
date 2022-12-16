export default async function fetchElement(url) {
	const response = await fetch(url);
	let data = await response.json();
	return data
}