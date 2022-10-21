let theInput = document.querySelector(".get-repos input"),
    getButton = document.querySelector(".get-button"),
    reposData = document.querySelector(".show-data");

getButton.onclick = function () {
    getRepos()
};

// Get Repos Function
function getRepos() {

    if (theInput.value == "") {
        reposData.innerHTML = "<span>Please Write Github Username.</span>";
    }else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)

        .then((response) => response.json())

        .then((repositories) => {
            // Empty the container
            reposData.innerHTML = "";
            // Loop On Repositories
            repositories.forEach(repo => {
                // Create the main div
                let mainDiv = document.createElement("div");
                // Create Repo name text
                let repoName = document.createTextNode(repo.name);
                // Append text to div
                mainDiv.appendChild(repoName);

                // Create Repo URL
                let theUrl = document.createElement("a");
                // Create repo url text
                let theURlText = document.createTextNode("visite");
                // append the url to a tag
                theUrl.appendChild(theURlText);
                // Add the href
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
                // set attr blank
                theUrl.setAttribute("target", "_blank");
                // append url to div
                mainDiv.appendChild(theUrl);

                // Create stars count span
                let starsSpan = document.createElement("span");
                // Create the Stars count text
                let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
                // add start count text to stars span
                starsSpan.appendChild(starsText);
                // append stars span to div
                mainDiv.appendChild(starsSpan);

                // add class on main div
                mainDiv.className = "repo-box";

                // append the main div to container
                reposData.appendChild(mainDiv);
            });

        });
    }
}

// website: jsonplaceholder => gives me fake api to train