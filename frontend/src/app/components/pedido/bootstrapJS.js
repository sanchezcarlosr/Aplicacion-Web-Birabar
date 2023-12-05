function selectTab(element) {
    const tabs = document.getElementsByClassName('nav-link');

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    element.classList.add('active');
}