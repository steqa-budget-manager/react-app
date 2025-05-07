import {createBrowserRouter, Navigate} from "react-router-dom";
import {PLogin} from "../pages/Login/PLogin.tsx";
import {PSignup} from "../pages/Signup/PSignup.tsx";
import {PTransactions} from "../pages/Transactions/PTransactions.tsx";
import {PTransactionDetail} from "../pages/TransactionDetail/PTransactionDetail.tsx";
import {TransactionType} from "../api/schemas/transaction/TransactionType.ts";
import {PTransfers} from "../pages/Transfers/PTransfers.tsx";
import {PTransferDetail} from "../pages/TransferDetail/PTransferDetail.tsx";


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
])