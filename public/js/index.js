const menuElement = document.getElementById('hamburger')


const logoutListenerHandler = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert(response.statusText);
    }
};

const onMenuToggle = () => {
    const menuElement = document.getElementById('hamburger')
    console.log('MENU CHECKBOX IS:');
    console.log(menuElement.checked);
    if (menuElement.checked) {
        //create and show drop down with links
        const navContainer = document.createElement('div');
        navContainer.id = ('active-nav');
        navContainer.classList.add('mobile-nav');

        //insert nav-links
        const latestArticleLink = document.createElement('a');
        latestArticleLink.href = "/"
        latestArticleLink.classList.add('mobile-links');
        const latestContainer = document.createElement('div');
        latestContainer.classList.add('mobile-link-container');
        const navLinkText = document.createElement('h2');
        navLinkText.classList.add('mobile-link-text')
        navLinkText.innerText = "Home";
        latestContainer.append(navLinkText);
        latestArticleLink.append(latestContainer);
        navContainer.append(latestArticleLink);


        const articleArchivesLink = document.createElement('a');
        articleArchivesLink.href = "/dashboard"
        articleArchivesLink.classList.add('mobile-links');
        const archieveContainer = document.createElement('div');
        archieveContainer.classList.add('mobile-link-container');
        const navArchiveLinkText = document.createElement('h2');
        navArchiveLinkText.classList.add('mobile-link-text')
        navArchiveLinkText.innerText = "Dashboard";
        archieveContainer.append(navArchiveLinkText);
        articleArchivesLink.append(archieveContainer);
        navContainer.append(articleArchivesLink);

        if (document.getElementById('login-title')) {
            const searchArticlesLink = document.createElement('a');
            searchArticlesLink.href = "/login";
            searchArticlesLink.classList.add('mobile-links');
            const searchContainer = document.createElement('div');
            searchContainer.classList.add('mobile-link-container');
            const navSearchLinkText = document.createElement('h2');
            navSearchLinkText.classList.add('mobile-link-text');
            navSearchLinkText.innerText = "Login";
            searchContainer.append(navSearchLinkText);
            searchArticlesLink.append(searchContainer);
            navContainer.append(searchArticlesLink);
        }
        else {

            const searchArticlesLink = document.createElement('a');
            searchArticlesLink.classList.add('mobile-links');
            searchArticlesLink.addEventListener('click', logoutListenerHandler)
            const searchContainer = document.createElement('div');
            searchContainer.classList.add('mobile-link-container');
            const navSearchLinkText = document.createElement('h2');
            navSearchLinkText.classList.add('mobile-link-text');
            navSearchLinkText.innerText = "Logout";
            searchContainer.append(navSearchLinkText);
            searchArticlesLink.append(searchContainer);
            navContainer.append(searchArticlesLink);
        }

        //find the navbar and append below
        const navBar = document.querySelector('.nav-bar');
        navBar.after(navContainer);
    }
    else {
        //Delete the navbar
        const activeNav = document.getElementById('active-nav');
        activeNav.remove();
    }


}


document.getElementById('hamburger').addEventListener('click', onMenuToggle);
const logoutBtn = document.getElementById('logout-btn')

const init = () => {
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutListenerHandler)
    }
}

init();