const fetchEmployees = async (API_URL, httpMethod = "GET") => {
	try {
		const response = await fetch(API_URL, {
			method: httpMethod,
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const result = await response.json();
		const data = await result.data;
		return data;
	} catch (error) {
		console.error("Error fetching employees:", error);
		throw error;
	}
};

export default fetchEmployees;
