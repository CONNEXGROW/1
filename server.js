const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files
app.use(express.static(__dirname));

// Load data from 'data.json'
const loadData = () => {
  try {
    return JSON.parse(fs.readFileSync('data.json', 'utf8'));
  } catch (error) {
    return [];
  }
};

// Save data to 'data.json'
const saveData = (data) => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

// Get all data
app.get('/api/data', (req, res) => {
  const data = loadData();
  res.json(data);
});

// Add new data
app.post('/api/data', (req, res) => {
  const newData = req.body;
  const data = loadData();
  data.push(newData);
  saveData(data);
  res.json({ message: 'Data added successfully!' });
});

// Delete data by index
app.delete('/api/data/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  let data = loadData();
  data = data.filter((_, i) => i !== index);
  saveData(data);
  res.json({ message: 'Data deleted successfully!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});