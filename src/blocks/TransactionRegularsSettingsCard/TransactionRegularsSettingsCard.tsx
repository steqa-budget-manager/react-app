import {CardsMenu} from "../../components/CardsMenu/CardsMenu.tsx";
import {FC, useEffect, useState} from "react";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";
import {TransactionRegularResponse} from "../../api/schemas/transaction/regular/TransactionRegularResponse.ts";
import {getAllTransactionRegulars} from "../../api/requests/transactionRegularRequests.ts";
import {TableRow} from "../../components/TableRow/TableRow.tsx";
import {fromCents} from "../../utils/moneyConverters.ts";
import {useNavigate} from "react-router-dom";

export interface TransactionRegularsSettingsCardProps {
	rootPath: string;
	type: TransactionType;
	onError?: (error: string) => void;
	refreshTrigger?: number;
}

export const TransactionRegularsSettingsCard: FC<TransactionRegularsSettingsCardProps> = (
	{
		rootPath,
		type,
		onError,
		refreshTrigger
	}
) => {
	const navigate = useNavigate();

	const [transactionRegulars, setTransactionRegulars] = useState<TransactionRegularResponse[]>([]);

	const [fetchGetTransactionRegulars, , getTransactionRegularsError, resetGetTransactionRegularsError] = useHttpRequest(
		async () => getAllTransactionRegulars(type)
	)

	useEffect(() => {
		if (onError && getTransactionRegularsError) {
			onError(getTransactionRegularsError);
			resetGetTransactionRegularsError();
		}
	}, [getTransactionRegularsError]);

	useEffect(() => {
		fetchGetTransactionRegulars().then(setTransactionRegulars);
	}, [refreshTrigger]);

	return (
		<CardsMenu header={type == TransactionType.INCOME ? "Регулярные доходы" : "Регулярные расходы"}>
			{transactionRegulars.map((transactionRegular) => (
				<TableRow
					secondary
					onClick={() => navigate(rootPath + "/" + transactionRegular.id)}
					key={transactionRegular.id}
					leftUpper={transactionRegular.shortName}
					rightUpper={" "}
					leftTop={transactionRegular.description}
					rightTop={fromCents(transactionRegular.amount) + " ₽"}
					leftBottom={transactionRegular.category}
					rightBottom={transactionRegular.account}
				/>
			))}
		</CardsMenu>
	)
}