// backend/routes/userRoutes.js
router.get('/:username', (req, res) => {
  const { username } = req.params;
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Failed to fetch user' });
    }
    res.status(200).json(result[0]);
  });
});
