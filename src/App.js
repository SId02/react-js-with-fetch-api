import React, { Component, useState, useEffect } from "react";
import "./App.css";
const App = () => {
	// state
	const [news, setNews] = useState([]);
	const [searchQuery, setSearchQuery] = useState("react");
	const [url, setUrl] = useState(
		"http://hn.algolia.com/api/v1/search?query=react"
	);
	const [loading, setLoading] = useState(false);


	const fetchNews = () => {
		setLoading(true);
		fetch(url)
			.then((result) => result.json())
			.then((data) => (setNews(data.hits), setLoading(false)))
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		fetchNews();
	}, [url]);

	const handleChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
	};

	const showLoading = () =>
		loading ? (
			<div className="content-header">
				<h2>Loading...</h2>
			</div>
		) : (
			""
		);

	const searchForm = () => (
		
		<form className="form my-1" onSubmit={handleSubmit}>
			<input
				type="text"
				value={searchQuery}
				className="inputfiled"
				onChange={handleChange}
			/>
			<button className="btn btn-dark my-1">Search</button>
		</form>
	);

	const showNews = () => news.map((n, i) => <p key={i}>{n.title}</p>);

	return (
		<div>
			

			{/* {searchForm()}
			{showLoading()}
			{showNews()} */}

		 <nav className="navbar bg-navbar">
				<h1>Search Hacker News</h1>
			
			</nav>
			<section className="container">
				<div className="post-form">
					
						{showLoading()}
					
					
					{searchForm()}
					<div className="news">
						<div className="post news-inner news-content my-1 p-1">
							<p className="my-1">{showNews()}</p>
						</div>
					</div>
				</div>
			</section>

			<footer className=" footer bg-footer">
				<h4>Search Hacker News</h4>
				<p> Using the API http://hn.algolia.com/ </p>
			</footer> 
		</div>
	);
};
export default App;
