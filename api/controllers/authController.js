const bcrypt = require('bcrypt');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  register: async (req, res) => {
    try {
      const { username, password, email , role } = req.body;  

      if (!username || !password || !email || !role) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      
      const newUser = await User.create({
        username,
        email,
        role,
        password_hash: passwordHash, 
      });

      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
  
      
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      
      const token = jwt.sign(
        { userId: user.id, username: user.username, role: user.role }, 
        JWT_SECRET, 
        { expiresIn: '1d' } 
      );
  
      
      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        token: token
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
