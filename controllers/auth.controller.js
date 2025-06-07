const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Client = db.client;
const Brand = db.brand;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.signup = async (req, res) => {
  try {
    // Save User to Database
    const user = await User.create({
      userFirstName: req.body.userFirstName,
      userLastName: req.body.userLastName,
      userBirthDate: req.body.userBirthDate,
      userType: req.body.userType,
      userGender: req.body.userGender,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      phoneNum: req.body.phoneNum,
      address: req.body.address,
    });

    // If the user is a CLIENT, create a Client entry
    if (req.body.userType === 'CLIENT') {
      try {
        await Client.create({
          userId: user.id,
        });
        res.status(201).send(user); // Send the user object in the response
        return;
      } catch (error) {
        res.status(500).send({ message: error.message });
        return;
      }
    }

    // If the user is a BRAND, create a Brand entry
    if (req.body.userType === 'BRAND') {
      try {
        await Brand.create({
          userId: user.id,
        });
        res.status(201).send(user); // Send the user object in the response
        return;
      } catch (error) {
        res.status(500).send({ message: error.message });
        return;
      }
    }

    // Send response for other user types
    res.status(201).send(user); // Send the user object in the response
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id },
                           config.secret,
                           {
                            algorithm: 'HS256',
                            allowInsecureKeySizes: true,
                            expiresIn: 86400, // 24 hours
                           });

 
    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      email: user.email,
      phoneNum: user.phoneNum,
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
      userType: user.userType,
      userGender: user.userGender,
      address: user.address,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};