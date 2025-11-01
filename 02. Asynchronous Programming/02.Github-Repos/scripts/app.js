function loadRepos() {
	// read input value
	// get user repos using input
	// if no error:
	//  - output repos in list
	// otherwise:
	//  - show error massage

	const list = document.getElementById('repos');
	const username = document.getElementById('username').value;
	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url) 
		.then((response) => response.json())
		.then((data) => {
			list.innerHTML = (data.map(repo => `<li><a></`))
			console.log(data[0].html_url);
			console.log(data[0].full_name)
		});
}