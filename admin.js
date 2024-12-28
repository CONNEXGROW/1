const API_URL = 'http://localhost:3000/api/data';

// Load all entries
async function loadAdminContent() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch data');

    const data = await response.json();

    const entriesList = document.getElementById('entriesList');
    entriesList.innerHTML = '';

    data.forEach((entry, index) => {
      const li = document.createElement('li');
      li.textContent = `Name: ${entry.name}, Date: ${entry.date}, Time: ${entry.time}, Location: ${entry.location}`;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => deleteEntry(index);

      li.appendChild(deleteButton);
      entriesList.appendChild(li);
    });
  } catch (error) {
    console.error('Error loading admin content:', error);
  }
}

// Save a new entry
async function saveAdminContent() {
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

  alert('Content added!');
  loadAdminContent();
}

// Delete an entry
async function deleteEntry(index) {
  await fetch(`${API_URL}/${index}`, { method: 'DELETE' });
  alert('Entry deleted!');
  loadAdminContent();
}

document.getElementById('saveButton').addEventListener('click', saveAdminContent);
loadAdminContent();