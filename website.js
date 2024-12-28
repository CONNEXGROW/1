const API_URL = 'http://localhost:3000/api/data';

// Load and display content
async function loadWebsiteContent() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch data');

    const data = await response.json();

    const contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = '';

    data.forEach((entry) => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h2>Name: ${entry.name}</h2>
        <p>Date: ${entry.date}</p>
        <p>Time: ${entry.time}</p>
        <p>Location: ${entry.location}</p>
      `;
      contentContainer.appendChild(div);
    });
  } catch (error) {
    console.error('Error loading website content:', error);
    document.getElementById('contentContainer').textContent = 'Error loading content.';
  }
}

loadWebsiteContent();