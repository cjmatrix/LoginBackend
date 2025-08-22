document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signoutButton = document.getElementById('signoutButton');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;
            const errorMessage = document.getElementById('errorMessage');

            const response = await fetch('/auth', {
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




// document.addEventListener('DOMContentLoaded', () => {
//     const loginForm = document.getElementById('loginForm');
//     const signoutButton = document.getElementById('signoutButton');

//     if (loginForm) {
//         loginForm.addEventListener('submit', async (e) => {
//             e.preventDefault();
//             const username = e.target.username.value;
//             const password = e.target.password.value;
//             const errorMessage = document.getElementById('errorMessage');

//             // --- THE FIX IS HERE ---
//             // Change the fetch URL from '/login' to '/auth'
//             const response = await fetch('/auth', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 // Your authController expects 'user' and 'pwd', which is correct here
//                 body: JSON.stringify({ user: username, pwd: password })
//             });

//             if (response.ok) {
//                 // If using JWTs, you would typically save the token here
//                 // For this simple case, we'll just redirect to a protected page
//                 window.location.href = '/employee'; // Redirect to a protected route like employees
//             } else {
//                 errorMessage.textContent = 'Invalid username or password.';
//             }
//         });
//     }

//     if (signoutButton) {
//         signoutButton.addEventListener('click', async () => {
//             // Note: Your signout should ideally be a GET request to /logout
//             await fetch('/logout');
//             window.location.href = '/login.html'; // Redirect to the login page
//         });
//     }
// });