import classes from "../../Container.module.css";
import {useEffect} from "react";

export const PLoading = () => {
	useEffect(() => {
		document.title = "Загрузка";
	}, []);

	return (
		<div className={classes.mainContainer}>
			<div className={classes.heightContainer}>
				<div className={classes.widthContainer}>
					<div className={classes.content}>
					</div>
				</div>
			</div>
		</div>
	)
}