import {useEffect} from "react";

export const PIncomes = () => {
	useEffect(() => {
		document.title = "Поступления";
	}, []);

	return (
		<h1>Incomes</h1>
	)
}