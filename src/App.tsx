import {RouterProvider} from "react-router-dom";
import {loggedInRouter, loggedOutRouter} from "./routers/Router.tsx";
import classes from "./Container.module.css"
import {AuthContext} from "./contexts/AuthContext.tsx";
import {AuthProvider} from "./contexts/AuthProvider.tsx";

function App() {
	return (
		<>
			<AuthProvider>
				<AuthContext.Consumer>
					{({isLogged}) => (
						<div className={classes.mainContainer}>
							<div className={classes.heightContainer}>
								<div className={classes.widthContainer}>
									<div className={classes.content}>
										<RouterProvider router={isLogged ? loggedInRouter : loggedOutRouter}/>
									</div>
								</div>
							</div>
						</div>
					)}
				</AuthContext.Consumer>
			</AuthProvider>
		</>
	)
}

export default App
