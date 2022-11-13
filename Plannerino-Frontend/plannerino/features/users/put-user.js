import axios from 'axios';

export default async function putUser(userId, {firstName, lastName, email, password}) {
	const response = await axios.put(`https://localhost:7063/api/User/${userId}`,
		{
			id: userId,
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password
		}
	);
}
