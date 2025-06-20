import {useEffect, useState} from "react";
import classes from "./Accounts.module.css"
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {Toast} from "../../components/Toast/Toast.tsx";
import {ToastBar} from "../../components/ToastBar/ToastBar.tsx";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {getAllAccountsBalances} from "../../api/requests/accountRequests.ts";
import {AccountBalanceResponse} from "../../api/schemas/account/AccountBalanceResponse.ts";
import {TableRow} from "../../components/TableRow/TableRow.tsx";
import {fromCents} from "../../utils/moneyConverters.ts";
import {Table} from "../../components/Table/Table.tsx";
import {BottomNavigation} from "../../blocks/BottomNavigation/BottomNavigation.tsx";
import {LoadingText} from "../../components/LoadingText/LoadingText.tsx";

export const PAccounts = () => {
	const [messages, addMessage] = useMessagesTimeStack();
	const [accounts, setAccounts] = useState<AccountBalanceResponse[]>([]);

	const [fetchGetAccounts, isGetAccountsLoading, getAccountsError, resetGetAccountsError] = useHttpRequest(
		async () => getAllAccountsBalances(),
	);

	const getTotalBalance = () => {
		let total = 0n;
		accounts.forEach((account) => total += BigInt(account.balance))
		return total;
	}

	useEffect(() => {
		document.title = "Аккаунты";
		fetchGetAccounts().then(setAccounts);
	}, []);

	useEffect(() => {
		if (getAccountsError) {
			addMessage(getAccountsError);
			resetGetAccountsError();
		}
	}, [getAccountsError]);

	return (
		<>
			<ToastBar>
				{messages.map((message, index) => (
					<Toast key={index} message={message} error/>
				))}
			</ToastBar>

			<div className={classes.container}>
				{isGetAccountsLoading ?
					(
						<LoadingText/>
					) :
					(<>
						<div className={classes.content}>
							<div className={classes.totalBalance}>
								<p><b>Всего средств</b></p>
								<p className={classes.balance}>{fromCents(getTotalBalance()) + " ₽"}</p>
							</div>

							<Table title="Аккаунты" subtitle={fromCents(getTotalBalance()) + " ₽"}>
								{accounts.map((account) => (
									<TableRow
										key={account.id}
										leftTop={account.name}
										rightTop={fromCents(account.balance) + " ₽"}
									/>
								))}
							</Table>

						</div>
					</>)
				}
				<BottomNavigation/>
			</div>
		</>
	)
}