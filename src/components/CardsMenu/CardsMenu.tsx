import classes from "./CardsMenu.module.css";
import {Children, FC, ReactNode} from "react";
import {NotFoundText} from "../NotFoundText/NotFoundText.tsx";

interface CardsMenuProps {
	header: string;
	children?: ReactNode | ReactNode[];
}

export const CardsMenu: FC<CardsMenuProps> = ({header, children}) => {
	return (
		<div className={classes.container}>
			<p><b>{header}</b></p>
			{Children.count(children) > 0 ? (
				<div className={classes.rows}>
					{Children.map(children, (child, index) => (
						<div key={index} className={classes.row}>{child}</div>
					))}
				</div>
			) : (
				<NotFoundText/>
			)}
		</div>
	)
}