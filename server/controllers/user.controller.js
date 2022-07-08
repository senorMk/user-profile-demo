import userModel from '../models/user.model.js';

let controller = {};

controller.registerUser = (req, res) => {
  console.log('Register user');
  userModel.registerUser(req, res);
};

controller.loginUser = (req, res) => {
  console.log('Login user');
  userModel.loginUser(req, res);
};

controller.getUserById = (req, res) => {
  console.log('Getting user by');
  userModel.getUserById(req, res);
};

controller.updateUserById = (req, res) => {
  console.log('Updating user by id');
  userModel.updateUserById(req, res);
};

export default controller;
