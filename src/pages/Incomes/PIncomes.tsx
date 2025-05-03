import {useEffect} from "react";
import classes from "./Incomes.module.css"
import {IncomesHistory} from "../../blocks/IncomesHistory/IncomesHistory.tsx";
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {Toast} from "../../components/Toast/Toast.tsx";
import {ToastBar} from "../../blocks/ToastBar/ToastBar.tsx";

export const PIncomes = () => {
	const [messages, addMessage] = useMessagesTimeStack();

	useEffect(() => {
		document.title = "Поступления";
	}, []);

	return (
		<div className={classes.container}>
			<ToastBar>
				{messages.map((message, index) => (
					<Toast key={index} message={message} error/>
				))}
			</ToastBar>
			<div className={classes.cards}></div>
			<div className={classes.filters}></div>
			<div className={classes.transactions}>
				<IncomesHistory onError={addMessage}/>
			</div>
			<div className={classes.footer}></div>
		</div>
	)
}