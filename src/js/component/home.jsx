import React from "react";
import Tasks from "./tasks.jsx";


//create your first component
const Home = () => {
	return (
		<div className="container-fluid p-0">
			<div className="row mt-4 mb-3">
				<div className="col-12">
					<h1 className=" text-center">
						 TO-DO LIST
					</h1>
					<Tasks />
				</div>
			</div>
	</div>
	
	);
};

export default Home;