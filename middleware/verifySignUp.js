const db = require("../models");
const User = db.user;

checkDuplicatePhoneNumOrEmail = async (req, res, next) => {
  try {
    // Log the entire request body for debugging
    console.log('Request body:', req.body);

    // Ensure req.body is defined
    if (!req.body) {
      return res.status(400).send({
        message: "Request body is missing!"
      });
    }

    const { phoneNum, email } = req.body;

    // Log the phoneNum and email for debugging
    console.log('Phone number:', phoneNum);

    // Check for duplicate phone number
    if (phoneNum) {
      let user = await User.findOne({
        where: {
          phoneNum: phoneNum
        }
      });

      if (user) {
        return res.status(400).send({
          message: "Failed! Phone number is already in use!"
        });
      }
    } else {
      return res.status(400).send({
        message: "Phone number is missing!"
      });
    }

   

    next();
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send({
      message: "Unable to validate user!",
      error: error.message
    });
  }
};

const verifySignUp = {
  checkDuplicatePhoneNumOrEmail,
};

module.exports = verifySignUp;
