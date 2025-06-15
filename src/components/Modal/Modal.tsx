import {FC, ReactNode} from "react";
import classes from "./Modal.module.css";
import {Button} from "../Button/Button.tsx";

interface ModalProps {
	onClose?: () => void;
	children?: ReactNode | ReactNode[]
}

export const Modal: FC<ModalProps> = ({onClose, children}) => {
	return (
		<div className={classes.modal}>
			<div className={classes.dimmer}></div>
			<div className={classes.container}>
				<div className={classes.body}>
					{children}
					<Button link onClick={onClose}>Закрыть</Button>
				</div>
			</div>
		</div>
	)
}