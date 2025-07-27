const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'FPL Proxy Server is running!' });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test endpoint working!', timestamp: new Date() });
});

// Get bootstrap data (working)
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

// Get bootstrap data with trailing slash (working)
app.get('/api/bootstrap-static/', async (req, res) => {
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

// Get manager info (NEW)
app.get('/api/entry/:id', async (req, res) => {
  try {
    const teamId = req.params.id;
    console.log(`Fetching manager data for team ${teamId}`);
    const response = await axios.get(
      `https://fantasy.premierleague.com/api/entry/${teamId}/`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching manager data:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch manager data',
      details: error.message 
    });
  }
});

// Get manager history (NEW)
app.get('/api/entry/:id/history', async (req, res) => {
  try {
    const teamId = req.params.id;
    console.log(`Fetching manager history for team ${teamId}`);
    const response = await axios.get(
      `https://fantasy.premierleague.com/api/entry/${teamId}/history/`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching manager history:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch manager history',
      details: error.message 
    });
  }
});

// Get league standings (NEW)
app.get('/api/leagues-classic/:id/standings', async (req, res) => {
  try {
    const leagueId = req.params.id;
    console.log(`Fetching league standings for league ${leagueId}`);
    const response = await axios.get(
      `https://fantasy.premierleague.com/api/leagues-classic/${leagueId}/standings/`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching league standings:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch league standings',
      details: error.message 
    });
  }
});

// Get team picks for gameweek (NEW)
app.get('/api/entry/:id/event/:gw/picks', async (req, res) => {
  try {
    const { id, gw } = req.params;
    console.log(`Fetching team picks for team ${id}, gameweek ${gw}`);
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

// Your existing league endpoint (keeping for compatibility)
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

// Your existing team endpoint (keeping for compatibility)
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

// Your existing team picks endpoint (keeping for compatibility)
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

// Get all fixtures
app.get('/api/fixtures', async (req, res) => {
  try {
    console.log('Fetching all fixtures');
    const response = await axios.get(
      'https://fantasy.premierleague.com/api/fixtures/'
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching fixtures:', error.message);
    res.status(500).json({
      error: 'Failed to fetch fixtures',
      details: error.message
    });
  }
});

// Get fixtures for a specific gameweek
app.get('/api/fixtures/event/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    console.log(`Fetching fixtures for gameweek ${eventId}`);
    const response = await axios.get(
      `https://fantasy.premierleague.com/api/fixtures/?event=${eventId}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching fixtures for gameweek ${eventId}:`, error.message);
    res.status(500).json({
      error: `Failed to fetch fixtures for gameweek ${eventId}`,
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`FPL Proxy Server running on port ${PORT}`);
});
