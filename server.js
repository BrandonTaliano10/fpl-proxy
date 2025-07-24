const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'FPL Proxy Server is running!' });
});

// Get classic league standings
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

// Get general FPL info (MISSING - ADD THIS)
app.get('/api/bootstrap-static', async (req, res) => {
  try {
    const response = await axios.get(
      'https://fantasy.premierleague.com/api/bootstrap-static/'
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching bootstrap data:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch bootstrap data',
      details: error.message 
    });
  }
});

// Get team info (MISSING - ADD THIS)
app.get('/api/team/:id', async (req, res) => {
  try {
    const teamId = req.params.id;
    const response = await axios.get(
      `https://fantasy.premierleague.com/api/entry/${teamId}/`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching team data:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch team data',
      details: error.message 
    });
  }
});

// Get team picks for a gameweek (MISSING - ADD THIS)
app.get('/api/team/:id/picks/:gw', async (req, res) => {
  try {
    const { id, gw } = req.params;
    const response = await axios.get(
      `https://fantasy.premierleague.com/api/entry/${id}/event/${gw}/picks/`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching team picks:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch team picks',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`FPL Proxy Server running on port ${PORT}`);
});