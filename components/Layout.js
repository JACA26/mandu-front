import Head from "next/head";
import React from "react";
import NavBar from "./NavBar";

const Layout = ({ title = "Mandü", children }) => {
	return (
		<>
			<Head>
				<title>{`${title} | Mandü`}</title>
			</Head>
			<main>
				<NavBar />
				<div className="container">{children}</div>
			</main>
		</>
	);
};

export default Layout;
