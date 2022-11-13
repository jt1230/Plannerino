import axios from 'axios';

export default async function fetchUser(email, password) {
  const response = await axios.get(
    `https://localhost:7063/api/User/${email}/${password}`
  );
  
 	return response.data;
}
