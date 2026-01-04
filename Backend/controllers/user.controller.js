import bcrypt from 'bcrypt';
import UserModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// Create JWT Token function
const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  return token;
};

// controller for user registration
// POST /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Invalid Credentials...' });
    }

    // check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    // create JWT token for the user
    const token = generateToken(newUser._id);
    newUser.password = undefined; // hide password in response

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
      token,
    });
  } catch (error) {
    console.log('Error registering user:', error);
    res.status(500).json({
      message: 'Error registering user',
      error: error.message,
    });
  }
};

// controller for user login
// POST /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // check if password is correct
    if (!user.comparePassword(password)) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // create JWT token for the user
    const token = generateToken(user._id);
    user.password = undefined; // hide password in response

    res
      .status(200)
      .json({ message: 'User logged in successfully', user, token });
  } catch (error) {
    console.log('Error logging in user:', error);
    res.status(500).json({
      message: 'Error logging in user',
      error: error.message,
    });
  }
};

// controller for getting user data by ID
// GET /api/users/data
export const getUserById = (req, res) => {
  try {
    const userId = req.params.id;

    // check if user exists
    const user = UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // return user data
    user.password = undefined; // hide password in response

    res.status(200).json({
      message: 'User data (by ID) fetched successfully',
      user,
    });
  } catch (error) {
    console.log('Error fetching user by ID:', error);
    res.status(500).json({
      message: 'Error fetching user by ID',
      error: error.message,
    });
  }
};

// controller for getting user resumes
// GET  /api/users/resumes
export const getUserResumes = async (req, res) => {
  try {
    const userId = req.user.id;

    // return user resumes
    const resumes = await ResumeModel.find({ userId });
    res.status(200).json({
      resumes,
    });
  } catch (error) {
    console.log('Error rretrieving resumes:', error);
    res
      .status(500)
      .json({ message: 'Error retrieving user resumes', error: error.message });
  }
};
