// Function for loggin out, it clears the local storage tokens
export const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('theme');
};

export const moveHeaderUp = () => {
    var element = document.getElementById('titleBoxId')
    if(element.className === 'titleBox'){
        element.classList.add("normal")
    }
}

export const moveHeaderDown = () => {
    var element = document.getElementById('titleBoxId')
    if(element.className === 'titleBox normal'){
        element.classList.remove("normal")
    }
}