import {createBrowserRouter, Navigate} from "react-router-dom";
import {PLogin} from "../pages/Login/PLogin.tsx";
import {PRegistration} from "../pages/Registration/PRegistration.tsx";
import {PIncomes} from "../pages/Incomes/PIncomes.tsx";


export const loggedInRouter = createBrowserRouter([
	{
		path: "/incomes",
		element: (<PIncomes/>)
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
		path: "/registration",
		element: (<PRegistration/>)
	},
	{
		path: "/",
		element: (<Navigate to="/login" replace={true}/>)
	},
])