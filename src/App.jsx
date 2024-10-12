import { useEffect, useState } from "react";
import Modal from "./components/Modal";

import "./style/app.css";
import Card from "./components/Card";
import fetchEmployees from "./hooks/Api";

const API_URL = "http://10.10.9.65";
const API_PORT = 3000;

function App() {
	const [data, setData] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [modal, setModal] = useState(false);

	useEffect(() => {
		fetchEmployees(`${API_URL}:${API_PORT}/api/employees`)
			.then((employee) => {
				setData(employee);
			})
			.catch((error) => {
				console.error("problema con los datos", error);
			});
	}, []);

	const handleSearch = (event) => {
		const { value } = event.target;
		setSearchText(value);
	};

	const addEmployee = (newEmployee) => {
		setData((prevData) => [...prevData, newEmployee]);
	};

	const deleteEmployee = async (id) => {
		try {
			const response = await fetch(
				`${API_URL}:${API_PORT}/api/employee/${id}`,
				{
					method: "DELETE",
				}
			);
			if (!response.ok) {
				throw new Error("error al eliminar el empleado");
			}
			setData((prevData) => prevData.filter((employee) => employee.id !== id));
		} catch (error) {
			console.error("Eroor", error);
		}
	};

	const updateEmployee = async (updatedEmployee) => {
		try {
			const response = await fetch(
				`${API_URL}:${API_PORT}/api/employee/${updatedEmployee.id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updatedEmployee),
				}
			);
			if (!response.ok) {
				throw new Error("Error al actualizar el empleado");
			}
			const result = await response.json();
			setData((prevData) =>
				prevData.map((employee) =>
					employee.id === result.id ? result : employee
				)
			);
		} catch (error) {
			console.error("Error", error);
		}
	};

	return (
		<>
			<div className="box-form">
				<input
					type="text"
					className="text"
					placeholder="Buscar Empleado"
					onChange={handleSearch}
				/>
				<button className="btn-create" onClick={() => setModal(true)}>
					Ingresar Empleado
				</button>
			</div>
			<div className="card">
				{data
					.filter((user) => {
						if (searchText === "") return true;
						return user.name.toLowerCase().includes(searchText.toLowerCase());
					})
					.map((user) => (
						<Card
							key={user.id}
							name={user.name}
							salary={user.salary}
							onDelete={() => deleteEmployee(user.id)}
							onUpdate={(updatedData) =>
								updateEmployee({ ...user, ...updatedData })
							}
						/>
					))}
			</div>
			{/* Modal */}
			{modal && (
				<Modal
					isOpen={modal}
					onClose={() => {
						setModal(false);
					}}
					addEmployee={addEmployee}
				/>
			)}
		</>
	);
}

export default App;
