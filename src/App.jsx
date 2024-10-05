import "./style/app.css";
import Card from "./components/Card";
import fetchEmployees from "./hooks/Api";

function App() {
	fetchEmployees("http://10.10.10.18:1234/api/employees");
	return (
		<>
			<div className="box-form">
				<input type="text" className="text" placeholder="Buscar Empleado" />
				<button className="btn-create">Ingresar Empleado</button>
			</div>
			<div className="card">
				<Card />
			</div>
		</>
	);
}

export default App;
