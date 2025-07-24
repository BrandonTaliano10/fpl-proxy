const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'FPL Proxy Server is running!' });
});

app.get('/api/league/:id', async (req, res) => {
  try {
    const leagueId = req.params.id;
    const response = await axios.get(
      `https://fantasy.premierleague.com/api/leagues-classic/${leagueId}/standings/`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching league data:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch league standings',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`FPL Proxy Server running on port ${PORT}`);
});

