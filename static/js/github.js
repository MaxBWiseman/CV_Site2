// Initialize when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Make sure jQuery is available
    if (typeof $ === 'undefined') {
        console.error("jQuery not available - GitHub functionality won't work");
        return;
    }
    
    // Clear previous data
    $('#gh-user-data').html('');
    $('#gh-repo-data').html('');
    
    // Load default username
    fetchGitHubInformation('MaxBWiseman');
    
    // Setup input event handler
    const usernameInput = document.getElementById('gh-username');
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            const username = this.value.trim();
            if (username) {
                fetchGitHubInformation(username);
            }
        });
    }
});

function userInformationHTML(user) {
    return `
        <h2>${user.name || 'No Name Provided'}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content d-flex justify-content-between">
            <div class="gh-avatar right-align ml-auto">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}"
                    class="d-sm-none d-md-block" />
                </a>
            </div>
            <p class="right-align">Followers: ${user.followers} - Following: ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

function repoInformationHTML(repos) {
    if (repos.length === 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    let listItemsHTML = repos.map(function (repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join('\n')}
                </ul>
            </div>`;
}

function fetchGitHubInformation(username) {
    if (!username) {
        username = $('#gh-username').val();
    }

    if (!username) {
        $('#gh-user-data-nousername').html('<h2 class="text-center">Please enter a GitHub username</h2>');
        return;
    }

    // Clear previous data
    $('#gh-user-data').html('');
    $('#gh-repo-data').html('');
    $('#loader-container').show();

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function (firstResponse, secondResponse) {
            let userData = firstResponse[0];
            let repoData = secondResponse[0];
            $('#gh-user-data').html(userInformationHTML(userData));
            $('#gh-repo-data').html(repoInformationHTML(repoData));
        },
        function (errorResponse) {
            if (errorResponse.status === 404) {
                $('#gh-user-data').html(`<h4 class="text-center">No info found for user ${username}</h4>`);
            } else if (errorResponse.status === 403) {
                let resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset') * 1000);
                $('#gh-user-data').html(`<h4 class="text-center">Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
            } else {
                $('#gh-user-data').html(`<h4 class="text-center">Error: ${errorResponse.responseJSON.message}</h4>`);
            }
        }
    ).always(function () {
        $('#loader-container').hide();
    });
}