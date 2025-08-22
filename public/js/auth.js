document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signoutButton = document.getElementById('signoutButton');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;
            const errorMessage = document.getElementById('errorMessage');

            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: username, pwd: password })
            });

            if (response.ok) {
                window.location.href = '/home'; 
            } else {
                const data = await response.json();
                errorMessage.textContent = data.message || 'Invalid username or password.';
            }
        });
    }

    if (signoutButton) {
        signoutButton.addEventListener('click', async () => {
            await fetch('/logout');
            window.location.href = '/login'; 
        });
    }
});