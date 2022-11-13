import axios from 'axios';

export default async function postGroup(userId, {name, description}) {
	const response = await axios({
		method: "post", 
		url: `https://localhost:7063/api/Group?userId=${userId}`,
		data: {
			name: name,
			description: description
		}
	});
}
