import {createBrowserRouter, Navigate} from "react-router-dom";
import {PLogin} from "../pages/Login/PLogin.tsx";
import {PSignup} from "../pages/Signup/PSignup.tsx";
import {PTransactions} from "../pages/Transactions/PTransactions.tsx";
import {PTransactionDetail} from "../pages/TransactionDetail/PTransactionDetail.tsx";
import {TransactionType} from "../api/schemas/transaction/TransactionType.ts";
import {PTransfers} from "../pages/Transfers/PTransfers.tsx";
import {PTransferDetail} from "../pages/TransferDetail/PTransferDetail.tsx";
import {PMore} from "../pages/More/PMore.tsx";
import {PAccountsSettings} from "../pages/AccountsSettings/PAccountsSettings.tsx";
import {PCategoriesSettings} from "../pages/CategoriesSettings/CategoriesSettings.tsx";
import {PRegularTransactions} from "../pages/RegularTransactions/RegularTransactions.tsx";


export const loggedInRouter = createBrowserRouter([
	{
		path: "/incomes",
		children: [
			{
				index: true,
				element: (<PTransactions type={TransactionType.INCOME} rootPath="/incomes"/>),
			},
			{
				path: ":id",
				element: (<PTransactionDetail type={TransactionType.INCOME} rootPath="/incomes"/>),
			},
		],
	},
	{
		path: "/expenses",
		children: [
			{
				index: true,
				element: (<PTransactions type={TransactionType.EXPENSE} rootPath="/expenses"/>),
			},
			{
				path: ":id",
				element: (<PTransactionDetail type={TransactionType.EXPENSE} rootPath="/expenses"/>),
			},
		],
	},
	{
		path: "/transfers",
		children: [
			{
				index: true,
				element: (<PTransfers rootPath="/transfers"/>),
			},
			{
				path: ":id",
				element: (<PTransferDetail rootPath="/transfers"/>),
			},
		],
	},
	{
		path: "/more",
		element: (
			<PMore
				accountsSettingsPath="/accounts/settings"
				categoriesSettingsPath="/categories/settings"
				regularTransactionsPath="/transactions/regulars"
			/>
		)
	},
	{
		path: "/accounts/settings",
		element: (<PAccountsSettings/>)
	},
	{
		path: "/categories/settings",
		element: (<PCategoriesSettings/>)
	},
	{
		path: "/transactions/regulars",
		element: (<PRegularTransactions rootPath="/transactions/regulars"/>)
	},
	{
		path: "/",
		element: (<Navigate to="/incomes" replace={true}/>)
	},
])


export const loggedOutRouter = createBrowserRouter([
	{
		path: "/login",
		element: (<PLogin/>)
	},
	{
		path: "/signup",
		element: (<PSignup/>)
	},
	{
		path: "/",
		element: (<Navigate to="/login" replace={true}/>)
	},
	{
		path: "/incomes",
		element: (<Navigate to="/login" replace={true}/>)
	},
	{
		path: "/expenses",
		element: (<Navigate to="/login" replace={true}/>)
	},
	{
		path: "/transfers",
		element: (<Navigate to="/login" replace={true}/>)
	},
	{
		path: "/more",
		element: (<Navigate to="/login" replace={true}/>)
	},
])