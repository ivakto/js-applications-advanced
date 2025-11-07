function loadRepos() {
   fetch('https://api.github.com/users/testnakov/repos')
      .then((response) => response.text())
      .then((data) => {
            const output = document.getElementById('res');
            output.textContent = data;
      });
  
}