document.addEventListener('DOMContentLoaded', async () => {
    const employeeList = document.getElementById('employeeList');
    const signoutButton = document.getElementById('signoutButton');
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
     
        window.location.href = '/login.html';
        return;
    }

    try {
     
        const response = await fetch('/employee', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}` 
            }
        });

        if (response.ok) {
            const employees = await response.json();
           
            employeeList.innerHTML = '';
           
            employees.forEach(emp => {
                const li = document.createElement('li');
                li.textContent = `${emp.firstname} ${emp.lastname}`;
                employeeList.appendChild(li);
            });
        } else if (response.status === 401 || response.status === 403) {
           
            window.location.href = '/login.html';
        } else {
             employeeList.innerHTML = '<li>Error loading employee data.</li>';
        }

    } catch (error) {
        console.error('Error fetching employees:', error);
        employeeList.innerHTML = '<li>Could not connect to the server.</li>';
    }

    if (signoutButton) {
        signoutButton.addEventListener('click', async () => {
            sessionStorage.removeItem('accessToken'); 
            await fetch('/logout');
            window.location.href = '/login.html';
        });
    }
    
    
});