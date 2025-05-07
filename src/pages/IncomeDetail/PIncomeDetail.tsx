import {useNavigate, useParams} from "react-router-dom";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {deleteTransaction, getTransactionById} from "../../api/requests/transactionRequests.ts";
import {useEffect, useState} from "react";
import {TransactionResponse} from "../../api/schemas/transaction/TransactionResponse.ts";
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {Toast} from "../../components/Toast/Toast.tsx";
import {ToastBar} from "../../blocks/ToastBar/ToastBar.tsx";
import classes from "./IncomeDetail.module.css"
import {formattedDate} from "../../utils/dateUtils.ts";
import {fromCents} from "../../utils/moneyConverters.ts";
import {Button} from "../../components/Button/Button.tsx";
import {Modal} from "../../components/Modal/Modal.tsx";
import {BottomModal} from "../../components/BottomModal/BottomModal.tsx";
import {UpdateIncomeForm} from "../../blocks/UpdateIncomeForm/UpdateIncomeForm.tsx";

export const PIncomeDetail = () => {
	const {id} = useParams();
	const navigate = useNavigate();
	const [messages, addMessage] = useMessagesTimeStack();

	const [income, setIncome] = useState<TransactionResponse>();

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);

	const [fetchGetIncome, isGetIncomeLoading, getIncomeError, resetGetIncomeError] = useHttpRequest(
		async (id: number) => getTransactionById(id),
	);

	const [fetchDeleteIncome, isDeleteIncomeLoading, deleteIncomeError, resetDeleteIncomeError] = useHttpRequest(
		async (id: number) => deleteTransaction(id),
	);

	const handleDeleteIncome = async (id: number) => {
		fetchDeleteIncome(id)
			.then(() => {
				navigate("/incomes");
			})
	}

	useEffect(() => {
		document.title = "Поступление";

		const incomeId = Number(id);
		if (isNaN(incomeId)) {
			navigate("/incomes");
			return;
		}

		fetchGetIncome(incomeId).then(setIncome);
	}, []);

	useEffect(() => {
		if (getIncomeError) {
			addMessage(getIncomeError);
			resetGetIncomeError();
		}
	}, [getIncomeError]);

	useEffect(() => {
		if (deleteIncomeError) {
			addMessage(deleteIncomeError);
			resetDeleteIncomeError();
		}
	}, [deleteIncomeError]);

	return (
		<>
			<div className={classes.container}>
				<ToastBar>
					{messages.map((message, index) => (
						<Toast key={index} message={message} error/>
					))}
				</ToastBar>

				{isGetIncomeLoading && (<p>Загрузка...</p>)}

				{income && (<>
					<div className={classes.content}>
						<div className={classes.info}>
							<h2>{formattedDate(income.date)}</h2>
							<div className={classes.description}>
								<p className={classes.center}>{income.description}</p>
								<div className={classes.additional}>
									<small>{income.account}</small>
									<small>{income.category}</small>
								</div>
							</div>
							<h1>+{fromCents(income.amount)} ₽</h1>
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
								onClick={() => handleDeleteIncome(income!.id)}
							>
								{isDeleteIncomeLoading ? "Загрузка..." : "Удалить"}
							</Button>
						</Modal>
					)}

					{showUpdateModal && (
						<BottomModal onClose={() => setShowUpdateModal(false)}>
							<UpdateIncomeForm
								initialValues={income}
								onError={addMessage}
								onSubmit={(newIncome) => {
									setIncome(newIncome);
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