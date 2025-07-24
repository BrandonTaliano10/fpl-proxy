// Add these new endpoints to match our app's expectations

// Get manager info (matches /api/entry/:teamId/)
app.get('/api/entry/:id', async (req, res) => {
  try {
    const teamId = req.params.id;
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

// Get manager history (matches /api/entry/:teamId/history/)
app.get('/api/entry/:id/history', async (req, res) => {
  try {
    const teamId = req.params.id;
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

// Get league standings (matches /api/leagues-classic/:leagueId/standings/)
app.get('/api/leagues-classic/:id/standings', async (req, res) => {
  try {
    const leagueId = req.params.id;
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

// Get team picks for gameweek (matches /api/entry/:teamId/event/:eventId/picks/)
app.get('/api/entry/:id/event/:gw/picks', async (req, res) => {
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

// Fix bootstrap-static endpoint (add trailing slash)
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

app.listen(PORT, () => {
  console.log(`FPL Proxy Server running on port ${PORT}`);
});
