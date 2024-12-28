// Base URL for API
const API_URL = 'http://localhost:3000/api/data';

// Load content on the website
async function loadContent() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const contentContainer = document.getElementById('content');
    contentContainer.innerHTML = ''; // Clear previous content

    data.forEach((item, index) => {
      const entry = document.createElement('div');
      entry.className = 'content-item';
      entry.innerHTML = `
        <p>Name: ${item.name}</p>
        <p>Date: ${item.date}</p>
        <p>Time: ${item.time}</p>
        <p>Location: ${item.location}</p>
      `;
      contentContainer.appendChild(entry);
    });
  } catch (error) {
    console.error('Error loading content:', error);
  }
}

// Save new content from the admin panel
async function saveContent() {
  try {
    const name = document.getElementById('nameInput').value;
    const date = document.getElementById('dateInput').value;
    const time = document.getElementById('timeInput').value;
    const location = document.getElementById('locationInput').value;

    const newData = { name, date, time, location };

    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });

    alert('Content updated!');
    loadContent(); // Reload content to reflect changes
  } catch (error) {
    console.error('Error saving content:', error);
    alert('Failed to save content.');
  }
}

// Attach events
if (document.title === 'Website Content') {
  loadContent();
} else if (document.title === 'Admin Panel') {
  document.getElementById('saveButton').addEventListener('click', saveContent);
}