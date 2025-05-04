import {createBrowserRouter, Navigate} from "react-router-dom";
import {PLogin} from "../pages/Login/PLogin.tsx";
import {PSignup} from "../pages/Signup/PSignup.tsx";
import {PIncomes} from "../pages/Incomes/PIncomes.tsx";
import {PIncomeDetail} from "../pages/IncomeDetail/PIncomeDetail.tsx";


export const loggedInRouter = createBrowserRouter([
	{
		path: "/incomes",
		children: [
			{
				index: true,
				element: (<PIncomes/>),
			},
			{
				path: ":id",
				element: (<PIncomeDetail/>),
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
])