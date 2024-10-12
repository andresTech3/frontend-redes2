import "../style/style-card.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";

function Card({ name, salary, onDelete, onUpdate }) {
	const [isEditing, setIsEditing] = useState(false);
	const [updatedName, setUpdatedName] = useState(name);
	const [updatedSalary, setUpdatedSalary] = useState(salary);

	const handleUpdate = () => {
		onUpdate({ name: updatedName, salary: updatedSalary });
		setIsEditing(false);
	};

	useEffect(() => {
		setUpdatedName(name);
		setUpdatedSalary(salary);
	}, [name, salary]);

	return (
		<div className="employee-info">
			{isEditing ? (
				<div className="infoEdit">
					<div>
						<input
							type="text"
							value={updatedName}
							onChange={(e) => setUpdatedName(e.target.value)}
						/>
						<input
							type="number"
							value={updatedSalary}
							onChange={(e) => setUpdatedSalary(e.target.value)}
						/>
					</div>
					<div className="btns">
						<button className="btnA" onClick={handleUpdate}>
							Actualizar
						</button>
						<button className="btnC" onClick={() => setIsEditing(false)}>
							Cancelar
						</button>
					</div>
				</div>
			) : (
				<>
					<p className="employee-name" onClick={() => setIsEditing(true)}>
						{name}
					</p>
					<hr />
					<p className="employee-salary" onClick={() => setIsEditing(true)}>
						${salary}
					</p>
					<FaEdit className="icon-edit" onClick={() => setIsEditing(true)} />
					<MdDelete className="icon-delete" onClick={onDelete} />
				</>
			)}
		</div>
	);
}

export default Card;
