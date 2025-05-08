import classes from "./CategoriesSettings.module.css";
import {ToastBar} from "../../components/ToastBar/ToastBar.tsx";
import {Toast} from "../../components/Toast/Toast.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {CategoriesSettingsCard} from "../../blocks/CategoriesSettingsCard/CategoriesSettingsCard.tsx";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";

export const PCategoriesSettings = () => {
	const [messages, addMessage] = useMessagesTimeStack();

	return (
		<>
			<div className={classes.container}>
				<ToastBar>
					{messages.map((message, index) => (
						<Toast key={index} message={message} error/>
					))}
				</ToastBar>

				<div className={classes.content}>
					<CategoriesSettingsCard type={TransactionType.INCOME} onError={addMessage}/>
					<CategoriesSettingsCard type={TransactionType.EXPENSE} onError={addMessage}/>
				</div>
				<div className={classes.footer}>
					<Button onClick={() => {
					}}>Добавить</Button>
				</div>
			</div>
		</>
	)
}