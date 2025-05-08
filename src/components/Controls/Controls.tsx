import classes from "./Controls.module.css"
import {FC} from "react";

interface ControlsProps {
	onEdit: () => void
	onDelete: () => void
}

export const Controls: FC<ControlsProps> = ({onEdit, onDelete}) => {
	return (
		<div className={classes.container}>
			<img src="/icons/pencil.svg" alt="edit" className={classes.button} onClick={onEdit}/>
			<img src="/icons/trash.svg" alt="delete" className={classes.button} onClick={onDelete}/>
		</div>
	)
}