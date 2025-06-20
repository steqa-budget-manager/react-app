import {FC, useEffect, useState} from "react";
import classes from "./Transfers.module.css"
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {Toast} from "../../components/Toast/Toast.tsx";
import {ToastBar} from "../../components/ToastBar/ToastBar.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {getAllTransfers} from "../../api/requests/transferRequests.ts";
import {TransferResponse} from "../../api/schemas/transfers/TransferResponse.ts";
import {TransfersHistory} from "../../blocks/TransfersHistory/TransfersHistory.tsx";
import {BottomModal} from "../../components/BottomModal/BottomModal.tsx";
import {AddTransferForm} from "../../blocks/AddTransferForm/AddTransferForm.tsx";
import {BottomNavigation} from "../../blocks/BottomNavigation/BottomNavigation.tsx";
import {LoadingText} from "../../components/LoadingText/LoadingText.tsx";

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
						<LoadingText/>
					) :
					(<>
						<div className={classes.filters}></div>
						<div className={classes.transfers}>
							<TransfersHistory
								rootPath={rootPath}
								transfers={transfers}
							/>
						</div>
					</>)
				}
				<BottomNavigation>
					<Button onClick={() => setShowAddModal(true)}>Добавить</Button>
				</BottomNavigation>
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