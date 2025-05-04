import {FC, ReactNode} from "react";
import classes from "./Modal.module.css";

interface ModalProps {
	onClose?: () => void;
	children?: ReactNode | ReactNode[]
}

export const Modal: FC<ModalProps> = ({onClose, children}) => {
	return (
		<div className={classes.modal}>
			<div className={classes.dimmer} onClick={onClose}></div>
			<div className={classes.container}>
				<div className={classes.body}>
					{children}
				</div>
			</div>
		</div>
	)
}