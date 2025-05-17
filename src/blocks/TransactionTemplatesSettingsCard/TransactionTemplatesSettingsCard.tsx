import {CardsMenu} from "../../components/CardsMenu/CardsMenu.tsx";
import {FC, useEffect, useState} from "react";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";
import {TableRow} from "../../components/TableRow/TableRow.tsx";
import {fromCents} from "../../utils/moneyConverters.ts";
import {useNavigate} from "react-router-dom";
import {TransactionTemplateResponse} from "../../api/schemas/transaction/template/TransactionTemplateResponse.ts";
import {getAllTransactionTemplates} from "../../api/requests/transactionTemplateRequests.ts";

export interface TransactionTemplatesSettingsCardProps {
	rootPath: string;
	type: TransactionType;
	onError?: (error: string) => void;
	refreshTrigger?: number;
}

export const TransactionTemplatesSettingsCard: FC<TransactionTemplatesSettingsCardProps> = (
	{
		rootPath,
		type,
		onError,
		refreshTrigger
	}
) => {
	const navigate = useNavigate();

	const [transactionTemplates, setTransactionTemplates] = useState<TransactionTemplateResponse[]>([]);

	const [fetchGetTransactionTemplates, , getTransactionTemplatesError, resetGetTransactionTemplatesError] = useHttpRequest(
		async () => getAllTransactionTemplates(type)
	)

	useEffect(() => {
		if (onError && getTransactionTemplatesError) {
			onError(getTransactionTemplatesError);
			resetGetTransactionTemplatesError();
		}
	}, [getTransactionTemplatesError]);

	useEffect(() => {
		fetchGetTransactionTemplates().then(setTransactionTemplates);
	}, [refreshTrigger]);

	return (
		<CardsMenu header={type == TransactionType.INCOME ? "Шаблоны доходов" : "Шаблоны расходов"}>
			{transactionTemplates.map((transactionTemplate) => (
				<TableRow
					secondary
					onClick={() => navigate(rootPath + "/" + transactionTemplate.id)}
					key={transactionTemplate.id}
					leftTop={transactionTemplate.description}
					rightTop={fromCents(transactionTemplate.amount) + " ₽"}
					leftBottom={transactionTemplate.category}
					rightBottom={transactionTemplate.account}
				/>
			))}
		</CardsMenu>
	)
}