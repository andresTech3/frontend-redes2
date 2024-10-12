import { useState } from "react";
import ReactDOM from "react-dom";
import "../style/style-modal.css";

const API_URL = "http://10.10.9.65";
const API_PORT = 3000;

function Modal({ isOpen, onClose, addEmployee }) {
	const [name, setName] = useState("");
	const [salary, setSalary] = useState("");

	const handleSubmit = async () => {
		const newData = { name, salary };
		try {
			const response = await fetch(`${API_URL}:${API_PORT}/api/employees`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newData),
			});
			if (!response.ok) {
				throw new Error("error en la solicitud");
			}
			const result = await response.json();
			addEmployee(result);
			setName("");
			setSalary("");
		} catch (error) {
			console.error("ERROR", error);
		}
	};

	if (!isOpen) return null;
	return ReactDOM.createPortal(
		<div className="modal-content">
			<div className="box-modal">
				<input
					type="text"
					placeholder="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="salary"
					value={salary}
					onChange={(e) => setSalary(e.target.value)}
				/>
				<button className="create" onClick={handleSubmit}>
					Crear
				</button>
				<button className="close" onClick={onClose}>
					X
				</button>
			</div>
		</div>,
		document.querySelector(".modal")
	);
}

export default Modal;
