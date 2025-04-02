const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Member = require('../models/members');
require('dotenv').config();


exports.register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const existingUser = await Member.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Member.create({
      first_name,
      last_name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Member.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user.member_id, email: user.email, userName: user.first_name, userLastName: user.last_name },
      process.env.JWT_SECRET,
      { expiresIn: '240000h' } 
    );

    const userDetails = {
      member_id: user.member_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    };

    return res.status(200).json({ message: 'Login successful', token, user: userDetails });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};