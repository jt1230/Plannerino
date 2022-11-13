import axios from 'axios';

export default async function postUser({firstName, lastName, email, password}) {
	const response = await axios({
		method: "post", 
		url: "https://localhost:7063/api/User",
		data: {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password
		}
	});
}
