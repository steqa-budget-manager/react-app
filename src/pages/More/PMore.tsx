import classes from './More.module.css'
import {MenuItem} from "../../components/MenuItem/MenuItem.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {FC, useContext, useEffect} from "react";
import {AuthContext} from "../../contexts/AuthContext.tsx";
import {BottomNavigation} from "../../blocks/BottomNavigation/BottomNavigation.tsx";

interface PMoreProps {
	accountsSettingsPath: string;
	categoriesSettingsPath: string;
	regularTransactionsPath: string;
}

export const PMore: FC<PMoreProps> = ({accountsSettingsPath, categoriesSettingsPath, regularTransactionsPath}) => {
	const {logout} = useContext(AuthContext);

	useEffect(() => {
		document.title = "Еще";
	}, []);

	return (
		<div className={classes.container}>
			<div className={classes.more}>
				<div className={classes.menu}>
					<MenuItem text="Настройка аккаунтов" to={accountsSettingsPath}/>
					<MenuItem text="Настройка категорий" to={categoriesSettingsPath}/>
					<MenuItem text="Шаблоны транзакций" to="?"/>
					<MenuItem text="Регулярные транзакции" to={regularTransactionsPath}/>
				</div>
			</div>
			<BottomNavigation>
				<Button onClick={logout}>Выйти</Button>
			</BottomNavigation>
		</div>
	)
}