import {RouterProvider} from "react-router-dom";
import {Router} from "./routers/Router.tsx";
import classes from "./Container.module.css"

function App() {
	return (
		<>
			<div className={classes.mainContainer}>
				<div className={classes.heightContainer}>
					<div className={classes.widthContainer}>
						<div className={classes.content}>
							<RouterProvider router={Router}/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default App
