import {useNavigate, useParams} from "react-router-dom";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {FC, useEffect, useState} from "react";
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {Toast} from "../../components/Toast/Toast.tsx";
import {ToastBar} from "../../components/ToastBar/ToastBar.tsx";
import classes from "./TransactionTemplateDetail.module.css"
import {fromCents} from "../../utils/moneyConverters.ts";
import {Button} from "../../components/Button/Button.tsx";
import {Modal} from "../../components/Modal/Modal.tsx";
import {BottomModal} from "../../components/BottomModal/BottomModal.tsx";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";
import {TransactionTemplateResponse} from "../../api/schemas/transaction/template/TransactionTemplateResponse.ts";
import {deleteTransactionTemplate, getTransactionTemplateById} from "../../api/requests/transactionTemplateRequests.ts";
import {
	UpdateTransactionTemplateForm
} from "../../blocks/UpdateTransactionTemplateForm/UpdateTransactionTemplateForm.tsx";

interface PTransactionTemplateDetailProps {
	rootPath: string
}

export const PTransactionTemplateDetail: FC<PTransactionTemplateDetailProps> = ({rootPath}) => {
	const {id} = useParams();
	const navigate = useNavigate();
	const [messages, addMessage] = useMessagesTimeStack();

	const [type, setType] = useState<TransactionType>();
	const [transactionTemplate, setTransactionTemplate] = useState<TransactionTemplateResponse>();

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);

	const [fetchGetTransactionTemplate, isGetTransactionTemplateLoading, getTransactionTemplateError, resetGetTransactionTemplateError] = useHttpRequest(
		async (id: number) => getTransactionTemplateById(id),
	);

	const [fetchDeleteTransactionTemplate, isDeleteTransactionTemplateLoading, deleteTransactionTemplateError, resetDeleteTransactionTemplateError] = useHttpRequest(
		async (id: number) => deleteTransactionTemplate(id),
	);

	const handleDeleteTransactionTemplate = async (id: number) => {
		fetchDeleteTransactionTemplate(id)
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

		fetchGetTransactionTemplate(transactionId).then((transactionTemplate) => {
			setTransactionTemplate(transactionTemplate);
			setType(transactionTemplate.type);
		});

		document.title = type == TransactionType.INCOME ? "Шаблон дохода" : "Шаблон расхода";
	}, []);

	useEffect(() => {
		if (getTransactionTemplateError) {
			addMessage(getTransactionTemplateError);
			resetGetTransactionTemplateError();
		}
	}, [getTransactionTemplateError]);

	useEffect(() => {
		if (deleteTransactionTemplateError) {
			addMessage(deleteTransactionTemplateError);
			resetDeleteTransactionTemplateError();
		}
	}, [deleteTransactionTemplateError]);

	return (
		<>
			<div className={classes.container}>
				<ToastBar>
					{messages.map((message, index) => (
						<Toast key={index} message={message} error/>
					))}
				</ToastBar>

				{isGetTransactionTemplateLoading && (<p>Загрузка...</p>)}

				{transactionTemplate && (<>
					<div className={classes.content}>
						<div className={classes.info}>
							<div className={classes.description}>
								<p className={classes.center}>{transactionTemplate.description}</p>
								<div className={classes.additional}>
									<small>{transactionTemplate.account}</small>
									<small>{transactionTemplate.category}</small>
								</div>
							</div>
							<h1>
								{type == TransactionType.INCOME ? "+" : "-"}
								{fromCents(transactionTemplate.amount)} ₽
							</h1>
						</div>
						<div className={classes.buttonGroup}>
							<Button onClick={() => setShowUpdateModal(true)}>Изменить</Button>
							<Button transparent expense onClick={() => setShowDeleteModal(true)}>Удалить</Button>
						</div>
					</div>

					{showDeleteModal && (
						<Modal onClose={() => setShowDeleteModal(false)}>
							<p className={classes.center}>Вы действительно хотите<br/>безвозвратно удалить шаблон транзакции?</p>
							<Button
								expense
								onClick={() => handleDeleteTransactionTemplate(transactionTemplate!.id)}
							>
								{isDeleteTransactionTemplateLoading ? "Загрузка..." : "Удалить"}
							</Button>
						</Modal>
					)}

					{showUpdateModal && (
						<BottomModal onClose={() => setShowUpdateModal(false)}>
							<UpdateTransactionTemplateForm
								type={transactionTemplate.type}
								initialValues={transactionTemplate}
								onError={addMessage}
								onSubmit={(newTransactionTemplate) => {
									setTransactionTemplate(newTransactionTemplate);
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