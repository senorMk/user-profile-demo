import mongoose from 'mongoose';
import zod from 'zod';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

// Create the user model
const userModel = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, Default: Date.Now },
});

// Define the User model object
let User = mongoose.model('User', userModel);

// Create user validator
const signupUserValidate = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  email: zod.string(),
  password: zod.string(),
});

// Login user validator
const loginUserValidate = zod.object({
  email: zod.string(),
  password: zod.string(),
});

// Update user validator
const updateUserValidate = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  email: zod.string(),
  password: zod.string(),
});

const getAuthToken = (userId, userType) => {
  // Expire in 1 hour
  const expirationSeconds = 60 * 60;

  const token = jsonwebtoken.sign(
    { _id: userId, type: userType },
    'TOP_SECRET',
    { expiresIn: expirationSeconds }
  );

  return token;
};

// Functions

// Register
User.registerUser = async (req, res) => {
  try {
    // Validate the data from the user
    const data = signupUserValidate.parse(req.body);

    let user = await User.findOne({ email: req.body.email }).exec();

    if (user)
      return res
        .status(400)
        .json({ message: 'The email address you entered already exists.' });

    let newUser = new User(data);

    let salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    let token = getAuthToken(newUser._id, 'user');

    // Save the user
    await newUser.save();

    // return registered user + session token
    let authNewUser = {
      newUser,
      token,
    };

    res
      .status(201)
      .json({ message: 'Successfully signed up!', user: authNewUser });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Error signing up!' });
  }
};

// Login
User.loginUser = async (req, res) => {
  try {
    const data = loginUserValidate.parse(req.body);
    let user = await User.findOne({
      email: req.body.email,
    }).exec();

    if (!user)
      return res.status(400).json({ message: 'Wrong email or password.' });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).json({ message: 'Wrong email or password.' });

    let token = getAuthToken(user._id, 'user');

    let authUser = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dateCreated: user.dateCreated,
    };

    return res.status(200).json({
      user: authUser,
      token: token,
      message: 'Successful login!',
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Error signing up!' });
  }
};

// Get user by id
User.getUserById = async (req, res) => {
  try {
    let userId = req.params.id;
    if (!userId) {
      return res.status(404).json({ message: 'No user found with that ID' });
    }

    let user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID' });
    }

    res.status(200).json({ message: 'User found successfully!', user });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Error fetching the user!' });
  }
};

// Update user by id
User.updateUserById = async (req, res) => {
  try {
    let userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: 'No user found with that ID' });
    }

    // Validate the data from the user
    const data = updateUserValidate.parse(req.body);

    let salt = await bcrypt.genSalt(10);
    let newPassword = await bcrypt.hash(data.password, salt);

    let savedUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: newPassword,
    };

    let user = await User.findByIdAndUpdate(userId, savedUser).exec();
    if (!user) {
      return res.status(400).json({ message: 'Not able to save the user' });
    }
    res
      .status(200)
      .json({ message: 'Successfully updated the user', user: user });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Error updating the user!' });
  }
};

export default User;
