import {FC, useEffect, useState} from "react";
import classes from "./Transfers.module.css"
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {Toast} from "../../components/Toast/Toast.tsx";
import {ToastBar} from "../../components/ToastBar/ToastBar.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {getAllTransfers} from "../../api/requests/transferRequests.ts";
import {Navigation} from "../../blocks/Navigation/Navigation.tsx";
import {TransferResponse} from "../../api/schemas/transfers/TransferResponse.ts";
import {TransfersHistory} from "../../blocks/TransfersHistory/TransfersHistory.tsx";
import {BottomModal} from "../../components/BottomModal/BottomModal.tsx";
import {AddTransferForm} from "../../blocks/AddTransferForm/AddTransferForm.tsx";

interface PTransfersProps {
	rootPath: string
}

export const PTransfers: FC<PTransfersProps> = ({rootPath}) => {
	const [messages, addMessage] = useMessagesTimeStack();
	const [showAddModal, setShowAddModal] = useState(false);
	const [transfers, setTransfers] = useState<TransferResponse[]>([]);

	const [fetchGetTransfers, isGetTransfersLoading, getTransfersError, resetGetTransfersError] = useHttpRequest(
		async () => getAllTransfers(),
	);

	const addTransferToList = (newTransfer: TransferResponse) => {
		setTransfers(prev => {
			const updated = [...prev, newTransfer];
			return updated.sort((a, b) => b.date.getTime() - a.date.getTime());
		});
	};

	useEffect(() => {
		document.title = "Переводы";
		fetchGetTransfers().then(setTransfers);
	}, []);

	useEffect(() => {
		if (getTransfersError) {
			addMessage(getTransfersError);
			resetGetTransfersError();
		}
	}, [getTransfersError]);

	return (
		<>
			<ToastBar>
				{messages.map((message, index) => (
					<Toast key={index} message={message} error/>
				))}
			</ToastBar>

			<div className={classes.container}>
				{isGetTransfersLoading ?
					(
						<small>Загрузка...</small>
					) :
					(<>
						<div className={classes.filters}></div>
						<div className={classes.transfers}>
							<TransfersHistory
								rootPath={rootPath}
								transfers={transfers}
							/>
						</div>
						<div className={classes.footer}>
							<Button onClick={() => setShowAddModal(true)}>Добавить</Button>
							<Navigation/>
						</div>
					</>)
				}
			</div>
			{showAddModal && (
				<BottomModal onClose={() => setShowAddModal(false)}>
					<AddTransferForm
						onError={addMessage}
						onSubmit={(newTransfer) => {
							addTransferToList(newTransfer)
							setShowAddModal(false)
						}}
					/>
				</BottomModal>
			)}
		</>
	)
}