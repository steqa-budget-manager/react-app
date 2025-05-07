import {useNavigate, useParams} from "react-router-dom";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {deleteTransaction, getTransactionById} from "../../api/requests/transactionRequests.ts";
import {FC, useEffect, useState} from "react";
import {TransactionResponse} from "../../api/schemas/transaction/TransactionResponse.ts";
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {Toast} from "../../components/Toast/Toast.tsx";
import {ToastBar} from "../../blocks/ToastBar/ToastBar.tsx";
import classes from "./TransactionDetail.module.css"
import {formattedDate} from "../../utils/dateUtils.ts";
import {fromCents} from "../../utils/moneyConverters.ts";
import {Button} from "../../components/Button/Button.tsx";
import {Modal} from "../../components/Modal/Modal.tsx";
import {BottomModal} from "../../components/BottomModal/BottomModal.tsx";
import {UpdateTransactionForm} from "../../blocks/UpdateTransactionForm/UpdateTransactionForm.tsx";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";

interface PTransactionDetailProps {
	type: TransactionType
	rootPath: string
}

export const PTransactionDetail: FC<PTransactionDetailProps> = ({type, rootPath}) => {
	const {id} = useParams();
	const navigate = useNavigate();
	const [messages, addMessage] = useMessagesTimeStack();

	const [transaction, setTransaction] = useState<TransactionResponse>();

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);

	const [fetchGetTransaction, isGetTransactionLoading, getTransactionError, resetGetTransactionError] = useHttpRequest(
		async (id: number) => getTransactionById(id),
	);

	const [fetchDeleteTransaction, isDeleteTransactionLoading, deleteTransactionError, resetDeleteTransactionError] = useHttpRequest(
		async (id: number) => deleteTransaction(id),
	);

	const handleDeleteTransaction = async (id: number) => {
		fetchDeleteTransaction(id)
			.then(() => {
				navigate(rootPath);
			})
	}

	useEffect(() => {
		document.title = type == TransactionType.INCOME ? "Доход" : "Расход";

		const transactionId = Number(id);
		if (isNaN(transactionId)) {
			navigate(rootPath);
			return;
		}

		fetchGetTransaction(transactionId).then(setTransaction);
	}, []);

	useEffect(() => {
		if (getTransactionError) {
			addMessage(getTransactionError);
			resetGetTransactionError();
		}
	}, [getTransactionError]);

	useEffect(() => {
		if (deleteTransactionError) {
			addMessage(deleteTransactionError);
			resetDeleteTransactionError();
		}
	}, [deleteTransactionError]);

	return (
		<>
			<div className={classes.container}>
				<ToastBar>
					{messages.map((message, index) => (
						<Toast key={index} message={message} error/>
					))}
				</ToastBar>

				{isGetTransactionLoading && (<p>Загрузка...</p>)}

				{transaction && (<>
					<div className={classes.content}>
						<div className={classes.info}>
							<h2>{formattedDate(transaction.date)}</h2>
							<div className={classes.description}>
								<p className={classes.center}>{transaction.description}</p>
								<div className={classes.additional}>
									<small>{transaction.account}</small>
									<small>{transaction.category}</small>
								</div>
							</div>
							<h1>
								{type == TransactionType.INCOME ? "+" : "-"}
								{fromCents(transaction.amount)} ₽
							</h1>
						</div>
						<div className={classes.buttonGroup}>
							<Button onClick={() => setShowUpdateModal(true)}>Изменить</Button>
							<Button transparent expense onClick={() => setShowDeleteModal(true)}>Удалить</Button>
						</div>
					</div>

					{showDeleteModal && (
						<Modal onClose={() => setShowDeleteModal(false)}>
							<p className={classes.center}>Вы действительно хотите<br/>безвозвратно удалить транзакцию?</p>
							<Button
								expense
								onClick={() => handleDeleteTransaction(transaction!.id)}
							>
								{isDeleteTransactionLoading ? "Загрузка..." : "Удалить"}
							</Button>
						</Modal>
					)}

					{showUpdateModal && (
						<BottomModal onClose={() => setShowUpdateModal(false)}>
							<UpdateTransactionForm
								type={type}
								initialValues={transaction}
								onError={addMessage}
								onSubmit={(newIncome) => {
									setTransaction(newIncome);
									setShowUpdateModal(false)
								}}
							/>
						</BottomModal>
					)}
				</>)}
			</div>
		</>
	)
}