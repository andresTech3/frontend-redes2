const fetchEmployees = async (API_URL) => {
	try {
		const response = await fetch(API_URL, {
			method: "GET",
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response;
	} catch (error) {
		console.error("Error fetching employees:", error);
		throw error; // Lanza el error para manejarlo en el componente
	}
};

export default fetchEmployees;
