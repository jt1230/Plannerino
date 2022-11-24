import axios from 'axios';

export default async function putUser(userId, {firstName, lastName, email, password, avatar}) {
	const response = await axios.put(`https://localhost:7063/api/User/${userId}`,
		{
			id: userId,
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			avatar: avatar
		}
	);
	console.log(response)
}
