import {useNavigate, useParams} from "react-router-dom";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {FC, useEffect, useState} from "react";
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {Toast} from "../../components/Toast/Toast.tsx";
import {ToastBar} from "../../components/ToastBar/ToastBar.tsx";
import classes from "./TransferDetail.module.css"
import {formattedDate} from "../../utils/dateUtils.ts";
import {fromCents} from "../../utils/moneyConverters.ts";
import {Button} from "../../components/Button/Button.tsx";
import {Modal} from "../../components/Modal/Modal.tsx";
import {TransferResponse} from "../../api/schemas/transfers/TransferResponse.ts";
import {deleteTransfer, getTransferById} from "../../api/requests/transferRequests.ts";
import {TransferAccounts} from "../../components/TransferAccounts/TransferAccounts.tsx";
import {BottomModal} from "../../components/BottomModal/BottomModal.tsx";
import {UpdateTransferForm} from "../../blocks/UpdateTransferForm/UpdateTransferForm.tsx";

interface PTransferDetailProps {
	rootPath: string
}

export const PTransferDetail: FC<PTransferDetailProps> = ({rootPath}) => {
	const {id} = useParams();
	const navigate = useNavigate();
	const [messages, addMessage] = useMessagesTimeStack();

	const [transfer, setTransfer] = useState<TransferResponse>();

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);

	const [fetchGetTransfer, isGetTransferLoading, getTransferError, resetGetTransferError] = useHttpRequest(
		async (id: number) => getTransferById(id),
	);

	const [fetchDeleteTransfer, isDeleteTransferLoading, deleteTransferError, resetDeleteTransferError] = useHttpRequest(
		async (id: number) => deleteTransfer(id),
	);

	const handleDeleteTransfer = async (id: number) => {
		fetchDeleteTransfer(id)
			.then(() => {
				navigate(rootPath);
			})
	}

	useEffect(() => {
		document.title = "Перевод";

		const transferId = Number(id);
		if (isNaN(transferId)) {
			navigate(rootPath);
			return;
		}

		fetchGetTransfer(transferId).then(setTransfer);
	}, []);

	useEffect(() => {
		if (getTransferError) {
			addMessage(getTransferError);
			resetGetTransferError();
		}
	}, [getTransferError]);

	useEffect(() => {
		if (deleteTransferError) {
			addMessage(deleteTransferError);
			resetDeleteTransferError();
		}
	}, [deleteTransferError]);

	return (
		<>
			<div className={classes.container}>
				<ToastBar>
					{messages.map((message, index) => (
						<Toast key={index} message={message} error/>
					))}
				</ToastBar>

				{isGetTransferLoading && (<p>Загрузка...</p>)}

				{transfer && (<>
					<div className={classes.content}>
						<div className={classes.info}>
							<h2>{formattedDate(transfer.date)}</h2>
							<div className={classes.description}>
								<p className={classes.center}>{transfer.description}</p>
								<div className={classes.additional}>
									<small><TransferAccounts from={transfer.fromAccount} to={transfer.toAccount}/></small>
								</div>
							</div>
							<h1>{fromCents(transfer.amount)} ₽</h1>
						</div>
						<div className={classes.buttonGroup}>
							<Button onClick={() => setShowUpdateModal(true)}>Изменить</Button>
							<Button transparent expense onClick={() => setShowDeleteModal(true)}>Удалить</Button>
							<Button link onClick={() => navigate(rootPath)}>Назад</Button>
						</div>
					</div>

					{showDeleteModal && (
						<Modal onClose={() => setShowDeleteModal(false)}>
							<p className={classes.center}>Вы действительно хотите<br/>безвозвратно удалить перевод?</p>
							<Button
								expense
								onClick={() => handleDeleteTransfer(transfer!.id)}
							>
								{isDeleteTransferLoading ? "Загрузка..." : "Удалить"}
							</Button>
						</Modal>
					)}

					{showUpdateModal && (
						<BottomModal onClose={() => setShowUpdateModal(false)}>
							<UpdateTransferForm
								initialValues={transfer}
								onError={addMessage}
								onSubmit={(newTransfer) => {
									setTransfer(newTransfer);
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