// Function for loggin out, it clears the local storage tokens
export const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('theme');
    window.location.reload();
};