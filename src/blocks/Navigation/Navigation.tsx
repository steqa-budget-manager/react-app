import classes from "./Navigation.module.css";
import {NavLink} from "react-router-dom";
import clsx from "clsx";

export const Navigation = () => {
	return (
		<div className={classes.container}>
			<NavLink
				to="/incomes"
				className={({isActive}) => clsx(classes.button, {[classes.active]: isActive})}
			>
				Доходы
			</NavLink>

			<NavLink
				to="/expenses"
				className={({isActive}) => clsx(classes.button, {[classes.active]: isActive})}
			>
				Расходы
			</NavLink>

			<NavLink
				to="/transfers"
				className={({isActive}) => clsx(classes.button, {[classes.active]: isActive})}
			>
				Переводы
			</NavLink>

			<NavLink
				to="/accounts"
				className={({isActive}) => clsx(classes.button, {[classes.active]: isActive})}
			>
				Аккаунты
			</NavLink>

			<NavLink
				to="/more"
				className={({isActive}) => clsx(classes.button, {[classes.active]: isActive})}
			>
				Еще
			</NavLink>
		</div>
	)
}