import {useNavigate, useParams} from "react-router-dom";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {FC, useEffect, useState} from "react";
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {Toast} from "../../components/Toast/Toast.tsx";
import {ToastBar} from "../../components/ToastBar/ToastBar.tsx";
import classes from "./RegularTransactionDetail.module.css"
import {fromCents} from "../../utils/moneyConverters.ts";
import {Button} from "../../components/Button/Button.tsx";
import {Modal} from "../../components/Modal/Modal.tsx";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";
import {TransactionRegularResponse} from "../../api/schemas/transaction/regular/TransactionRegularResponse.ts";
import {deleteTransactionRegular, getTransactionRegularById} from "../../api/requests/transactionRegularRequests.ts";
import {UpdateRegularTransactionForm} from "../../blocks/UpdateRegularTransactionForm/UpdateRegularTransactionForm.tsx";

interface PRegularTransactionDetailProps {
	rootPath: string
}

export const PRegularTransactionDetail: FC<PRegularTransactionDetailProps> = ({rootPath}) => {
	const {id} = useParams();
	const navigate = useNavigate();
	const [messages, addMessage] = useMessagesTimeStack();

	const [type, setType] = useState<TransactionType>();
	const [transactionRegular, setTransactionRegular] = useState<TransactionRegularResponse>();

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);

	const [
		fetchGetTransactionRegular,
		isGetTransactionRegularLoading,
		getTransactionRegularError,
		resetGetTransactionRegularError
	] = useHttpRequest(
		async (id: number) => getTransactionRegularById(id),
	);

	const [
		fetchDeleteTransactionRegular,
		isDeleteTransactionRegularLoading,
		deleteTransactionRegularError,
		resetDeleteTransactionRegularError
	] = useHttpRequest(
		async (id: number) => deleteTransactionRegular(id),
	);

	const handleDeleteTransactionRegular = async (id: number) => {
		fetchDeleteTransactionRegular(id)
			.then(() => {
				navigate(rootPath);
			})
	}

	useEffect(() => {
		const transactionId = Number(id);
		if (isNaN(transactionId)) {
			navigate(rootPath);
			return;
		}

		fetchGetTransactionRegular(transactionId).then((transaction) => {
			setTransactionRegular(transaction);
			setType(transaction.type);
		});

		document.title = type == TransactionType.INCOME ? "Регулярный доход" : "Регулярный расход";
	}, []);

	useEffect(() => {
		if (getTransactionRegularError) {
			addMessage(getTransactionRegularError);
			resetGetTransactionRegularError();
		}
	}, [getTransactionRegularError]);

	useEffect(() => {
		if (deleteTransactionRegularError) {
			addMessage(deleteTransactionRegularError);
			resetDeleteTransactionRegularError();
		}
	}, [deleteTransactionRegularError]);

	return (
		<>
			<div className={classes.container}>
				<ToastBar>
					{messages.map((message, index) => (
						<Toast key={index} message={message} error/>
					))}
				</ToastBar>

				{isGetTransactionRegularLoading && (<p>Загрузка...</p>)}

				{transactionRegular && (<>
					<div className={classes.content}>
						<div className={classes.info}>
							<h2>{transactionRegular.shortName}</h2>
							<div className={classes.description}>
								<p className={classes.center}>{transactionRegular.description}</p>
								<div className={classes.additional}>
									<small>{transactionRegular.account}</small>
									<small>{transactionRegular.category}</small>
								</div>
							</div>
							<h1>
								{transactionRegular.type == TransactionType.INCOME ? "+" : "-"}
								{fromCents(transactionRegular.amount)} ₽
							</h1>
						</div>
						<div className={classes.buttonGroup}>
							<Button onClick={() => setShowUpdateModal(true)}>Изменить</Button>
							<Button transparent expense onClick={() => setShowDeleteModal(true)}>Удалить</Button>
							<Button link onClick={() => navigate(rootPath)}>Назад</Button>
						</div>
					</div>

					{showDeleteModal && (
						<Modal onClose={() => setShowDeleteModal(false)}>
							<p className={classes.center}>Вы действительно хотите<br/>безвозвратно удалить регулярную транзакцию?</p>
							<Button
								expense
								onClick={() => handleDeleteTransactionRegular(transactionRegular!.id)}
							>
								{isDeleteTransactionRegularLoading ? "Загрузка..." : "Удалить"}
							</Button>
						</Modal>
					)}

					{showUpdateModal && (
						<Modal onClose={() => setShowUpdateModal(false)}>
							<UpdateRegularTransactionForm
								type={transactionRegular.type}
								initialValues={transactionRegular}
								onError={addMessage}
								onSubmit={(newTransaction) => {
									setTransactionRegular(newTransaction);
									setShowUpdateModal(false)
								}}
							/>
						</Modal>
					)}
				</>)}
			</div>
		</>
	)
}