// JavaScript code
const form = document.getElementById('github-user-r8s2');
const createdAtDisplay = document.getElementById('github-created-at');
const accountAgeDisplay = document.getElementById('github-account-age');
const statusDisplay = document.getElementById('github-status');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const token = new URLSearchParams(window.location.search).get('token');
    const url = `https://api.github.com/users/${username}` + (token ? `?token=${token}` : '');

    statusDisplay.textContent = 'Fetching user data...';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('User not found or API error');
        }
        const data = await response.json();
        const createdAt = new Date(data.created_at);
        createdAtDisplay.textContent = createdAt.toISOString().split('T')[0];
        
        // Calculate account age in whole years
        const now = new Date();
        let ageInYears = now.getFullYear() - createdAt.getFullYear();
        const monthDiff = now.getMonth() - createdAt.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < createdAt.getDate())) {
            ageInYears--;
        }
        
        accountAgeDisplay.textContent = ageInYears + ' years';
        statusDisplay.textContent = 'Lookup succeeded.';
    } catch (error) {
        createdAtDisplay.textContent = 'Error: ' + error.message;
        statusDisplay.textContent = 'Lookup failed.';
    }
});