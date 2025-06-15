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
import {PRegularTransactionDetail} from "../pages/RegularTransactionDetail/PRegularTransactionDetail.tsx";
import {PAccounts} from "../pages/Accounts/PAccounts.tsx";
import {PTransactionTemplates} from "../pages/TransactionTemplates/TransactionTemplates.tsx";
import {PTransactionTemplateDetail} from "../pages/TransactionTemplateDetail/TransactionTemplateDetail.tsx";


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
				transactionTemplatesPath="/transactions/templates"
				regularTransactionsPath="/transactions/regulars"
			/>
		)
	},
	{
		path: "/accounts/settings",
		element: (<PAccountsSettings topPath="/more"/>)
	},
	{
		path: "/categories/settings",
		element: (<PCategoriesSettings topPath="/more"/>)
	},
	{
		path: "/transactions/regulars",
		children: [
			{
				index: true,
				element: (<PRegularTransactions rootPath="/transactions/regulars" topPath="/more"/>),
			},
			{
				path: ":id",
				element: (<PRegularTransactionDetail rootPath="/transactions/regulars"/>),
			},
		],
	},
	{
		path: "/transactions/templates",
		children: [
			{
				index: true,
				element: (<PTransactionTemplates rootPath="/transactions/templates" topPath="/more"/>),
			},
			{
				path: ":id",
				element: (<PTransactionTemplateDetail rootPath="/transactions/templates"/>),
			},
		],
	},
	{
		path: "/accounts",
		element: (<PAccounts/>)
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