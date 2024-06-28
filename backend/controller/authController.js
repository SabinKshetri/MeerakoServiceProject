const { users } = require("../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/sendEmail");
exports.registerUser = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  if (!fullName || !email || !password) {
    res.status(404).json({
      message: "Please Provide Required Credentials !!",
    });
    return;
  }
  if (password !== confirmPassword) {
    res.status(400).json({
      message: "Password doesn't Match!!",
    });
    return;
  }
  const response = await users.create({
    fullName,
    email,
    password: bcrypt.hashSync(password, 8),
  });
  res.status(201).json({
    message: "User Created Successfully !!",
    data: response,
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide both email and password !!",
    });
  }

  try {
    const associatedDataWithEmail = await users.findAll({
      where: { email },
    });

    if (associatedDataWithEmail.length === 0) {
      return res.status(404).json({
        message: "User doesn't exist with this email !!",
      });
    }

    const associatedEmailPassword = associatedDataWithEmail[0].password;

    const isMatched = await bcrypt.compareSync(
      password,
      associatedEmailPassword
    );

    if (!isMatched) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { id: associatedDataWithEmail[0].id },
      process.env.SECRETKEY,
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      message: "User logged in successfully.",
      token: token,
    });
  } catch (error) {
    console.error("Error occurred while logging in:", error);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

exports.getProfile = async (req, res) => {
  const id = req.user.id;
  const response = await users.findAll({
    where: {
      id,
    },
  });
  res.status(200).json({
    message: "User Fetched Successfully !!",
    data: response,
  });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, password, confirmPassword } = req.body;
  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(404).json({
      message: "Please Provide Required Credentials !!",
    });
  }
  const response = await users.update(
    {
      fullName,
      email,
      password: bcrypt.hashSync(password, 8),
    },
    {
      where: {
        id,
      },
    }
  );
  res.status(200).json({
    message: "User Updated Successfully !!",
    data: response,
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const response = await users.destroy({
    where: {
      id,
    },
  });
  res.status(200).json({
    message: "User Deleted Successfully !!",
    data: response,
  });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(404).json({
      message: "Please Provide Email !!",
    });
    return;
  }
  const userExist = await users.findAll({
    where: {
      email,
    },
  });
  if (userExist.length == 0) {
    res.status(400).json({
      message: "User Doesnot Exist with this Email !!",
    });
  } else {
    const randomOTP = Math.floor(10000 * Math.random(9999));
    console.log(randomOTP);
    await sendEmail({
      email: email,
      subject: "Forgot Password OTP",
      otp: randomOTP,
    });
    (userExist[0].otp = randomOTP),
      (userExist[0].otpGeneratedTime = Date.now());
    await userExist[0].save();
    res.status(200).json({
      message: "OTP Has Been Sent Successfully !!",
      data: userExist,
    });
  }
};

exports.verifyOTP = async (req, res) => {
  const email = req.params.id;
  const { otp } = req.body;
  if (!email || !otp) {
    return res.status(404).json({
      message: "Please Provide Email , OTP !!",
    });
  }
  const userData = await users.findAll({
    where: {
      email: email,
      otp: otp,
    },
  });
  if (userData.length == 0) {
    res.status(404).json({
      message: "Invalid OTP !!",
    });
  } else {
    const currentTime = Date.now();
    const otpGeneratedTime = userData[0].otpGeneratedTime;
    if (currentTime - otpGeneratedTime <= 120000) {
      res.status(200).json({
        message: "Valid OTP !!",
        data: userData,
      });
    } else {
      res.status(400).json({
        message: "OTP Has Expired !!",
      });
    }
  }
};

exports.changepassword = async (req, res) => {
  const email = req.params.id;
  const { newPassword, confirmnewPassword } = req.body;
  if (!newPassword || !confirmnewPassword) {
    res.status(404).json({
      message: "Please Provide Password !!",
    });
    return;
  }
  if (newPassword !== confirmnewPassword) {
    return res.status(404).json({
      message: "Password Doesn't Match !!",
    });
  }
  const newhashedpassword = bcrypt.hashSync(newPassword, 8);
  const response = await users.update(
    {
      password: newhashedpassword,
    },
    {
      where: {
        email,
      },
    }
  );
  res.status(200).json({
    message: "Password Changed Successfully !!",
    data: response,
  });
};
