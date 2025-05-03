import classes from "./BottomModal.module.css"
import {FC, ReactNode} from "react";

interface BottomModalProps {
	onClose?: () => void;
	children?: ReactNode | ReactNode[]
}

export const BottomModal: FC<BottomModalProps> = ({onClose, children}) => {
	return (
		<div className={classes.modal}>
			<div className={classes.dimmer} onClick={onClose}></div>
			<div className={classes.body}>
				{children}
			</div>
		</div>
	)
}