import classes from "./Navigation.module.css";
import {NavigationButton} from "../../components/NavigationButton/NavigationButton.tsx";
import {useNavigate} from "react-router-dom";

export const Navigation = () => {
	const navigate = useNavigate();

	return (
		<div className={classes.container}>
			<NavigationButton text="Доходы" onClick={() => {
				navigate("/incomes");
			}}/>
			<NavigationButton text="Расходы" onClick={() => {
				navigate("/expenses");
			}}/>
			<NavigationButton text="Переводы" onClick={() => {
				navigate("/transfers");
			}}/>
			<NavigationButton text="Вклады" onClick={() => {
				navigate("/deposits");
			}}/>
			<NavigationButton text="Еще" onClick={() => {
				navigate("/more");
			}}/>
		</div>
	)
}