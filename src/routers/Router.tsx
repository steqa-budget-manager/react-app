import {createBrowserRouter} from "react-router-dom";
import {PLogin} from "../pages/Login/PLogin.tsx";
import {PRegistration} from "../pages/Registration/PRegistration.tsx";


export const Router = createBrowserRouter([
	{
		path: "/login",
		element: (<PLogin/>)
	},
	{
		path: "/registration",
		element: (<PRegistration/>)
	},
])