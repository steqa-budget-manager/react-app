import classes from './More.module.css'
import {MenuItem} from "../../components/MenuItem/MenuItem.tsx";
import {Navigation} from "../../blocks/Navigation/Navigation.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext.tsx";

export const PMore = () => {
	const {logout} = useContext(AuthContext);

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<div className={classes.menu}>
					<MenuItem text="Аккаунты" to="?"/>
					<MenuItem text="Категории" to="?"/>
					<MenuItem text="Шаблоны транзакций" to="?"/>
					<MenuItem text="Регулярные транзакции" to="?"/>
				</div>
				<Button onClick={logout}>Выйти</Button>
			</div>
			<div className={classes.footer}>
				<Navigation/>
			</div>
		</div>
	)
}