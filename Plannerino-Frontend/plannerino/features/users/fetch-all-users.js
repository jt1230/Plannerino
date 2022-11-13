import axios from 'axios';

export default async function fetchAllUsers() {
  const response = await axios.get(
    "https://localhost:7063/api/User"
  );
  
 	return response.data;
}