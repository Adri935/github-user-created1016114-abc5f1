// JavaScript code
const form = document.getElementById('github-user-r8s2');
const createdAtDisplay = document.getElementById('github-created-at');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const token = new URLSearchParams(window.location.search).get('token');
    const url = `https://api.github.com/users/${username}` + (token ? `?token=${token}` : '');

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('User not found or API error');
        }
        const data = await response.json();
        const createdAt = new Date(data.created_at).toISOString().split('T')[0];
        createdAtDisplay.textContent = createdAt;
    } catch (error) {
        createdAtDisplay.textContent = 'Error: ' + error.message;
    }
});