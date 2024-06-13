const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { jwtAuthMiddleware, generateToken } = require("../jwt");
const bcrypt = require("bcrypt");

//POST route for signup

router.post("/signin", async (req, res) => {
  try {
    const data = req.body;

    //Creating New User using DB model
    let newUser = new User(data);
    const adminExist = await User.findOne({role:"admin"});
    if(adminExist && newUser.role === "admin"){
        res.status(403).json({
            Message:"There can be only one Admin"
        })
    }else{
         //Hashing the Password
    const saltRounds = 10;
    const hashpass = async (plainpass) => {
      const hash = await bcrypt.hashSync(plainpass, saltRounds);
      return hash;
    };

    newUser.password = await hashpass(newUser.password);
    console.log(newUser);

    const response = await newUser.save();
    console.log("Data Saved", response);

    const payload = {
      id: response.id,
    };

    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is", token);

    res.status(200).json({
      response: response,
      token: token,
    });}
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});

//POST Route for Login
router.post("/login", async (req, res) => {
  //Comparing Password Function
  const comparePass = (plainPass, hashPass) => {
    const match = bcrypt.compareSync(plainPass, hashPass);
    return match;
  };

  try {
    //Extracting username and password from request
    const { aadharCardNumber, password } = req.body;

    //Find user exist or not
    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });
    console.log(user);
    let comPass = await comparePass(password, user.password);

    if (!user || !comPass) {
      res.status(401).json({
        Error: "Invalid Aadhar Number or Password",
      });
    }

    //Generate token
    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);
    console.log("Token is", token);

    res.status(200).json({
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      Error: "Internal Server Error",
    });
  }
});

//GET Route for Profile
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;

    const userId = userData.id;
    const user = await User.findById(userId);

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({
      Error: "Internal Server Error",
    });
  }
});

//PUT Route to Update Password
router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
  //Comparing Password Function
  const comparePass = (plainPass, hashPass) => {
    const match = bcrypt.compareSync(plainPass, hashPass);
    return match;
  };
  //Hashing the Password
  const saltRounds = 10;
  const hashpass = async (plainpass) => {
    const hash = await bcrypt.hashSync(plainpass, saltRounds);
    return hash;
  };
  const userId = req.user.id;
  const { currentPass, newPass } = req.body;

  let user = await User.findById(userId);
  console.log(user);
  let comPass = await comparePass(currentPass, user.password);

  if (!comPass) {
    res.status(401).json({
      Error: "Invalid Aadhar Number or Password",
    });
  }
  const hash = await hashpass(newPass);
  user.password = hash;
  await user.save();

  console.log("Password Updated");
  res.status(200).json({
    Message: "Password Updated Successfully",
  });
});

module.exports = router;
