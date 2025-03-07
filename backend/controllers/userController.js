const pool = require('../db');

const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const userId = req.user.id;
    const query = `
      SELECT 
        id,
        first_name,
        last_name,
        email,
        created_at
      FROM users 
      WHERE id = $1
    `;

    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = result.rows[0];
    delete userData.password;
    
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user profile',
      details: error.message 
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const userId = req.user.id;
    const { first_name, last_name } = req.body;

    if (!first_name && !last_name) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    let updateFields = [];
    let queryParams = [];
    let paramCounter = 1;

    if (first_name) {
      updateFields.push(`first_name = $${paramCounter}`);
      queryParams.push(first_name);
      paramCounter++;
    }
    if (last_name) {
      updateFields.push(`last_name = $${paramCounter}`);
      queryParams.push(last_name);
      paramCounter++;
    }

    const query = `
      UPDATE users 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramCounter}
      RETURNING id, first_name, last_name, email, created_at
    `;

    queryParams.push(userId);
    const result = await pool.query(query, queryParams);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ 
      error: 'Failed to update user profile',
      details: error.message 
    });
  }
};

module.exports = {
  updateUserProfile,
  getUserProfile
};