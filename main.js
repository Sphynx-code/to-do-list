let changeTheme = document.getElementById("changeTheme");
changeTheme.addEventListener('click', () => {
    let currentColor = getComputedStyle(document.body).backgroundColor;
    if (currentColor === "rgb(255, 255, 255)") {
       document.body.classList.add('dark-theme');
        localStorage.setItem('theme', '#2d2727'); 
        window.location.reload();

    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'rgb(255, 255, 255)'); 
        window.location.reload();

    }
});
window.addEventListener('load', () => {
    let storedTheme = localStorage.getItem('theme');
    if (storedTheme !== null) {
        if (storedTheme === 'rgb(255, 255, 255)') {
            document.body.classList.remove('dark-theme');
        } else if (storedTheme === '#2d2727') {
            document.body.classList.add('dark-theme');
        }
    } else {
        document.body.style.backgroundColor = "rgb(255, 255, 255)";
        localStorage.setItem('theme', 'rgb(255, 255, 255)');
    }
});

