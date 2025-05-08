import classes from "./CardsMenu.module.css";
import {Children, FC, ReactNode} from "react";

interface CardsMenuProps {
	header: string;
	children?: ReactNode | ReactNode[];
}

export const CardsMenu: FC<CardsMenuProps> = ({header, children}) => {
	return (
		<div className={classes.container}>
			<p><b>{header}</b></p>
			<div className={classes.rows}>
				{Children.map(children, (child, index) => (
					<div key={index} className={classes.row}>{child}</div>
				))}
			</div>
		</div>
	)
}