const jwt = require("jsonwebtoken");
const SecretKey="HelloWorld";

//Token Validation Function
const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({
      Error: "Token Not Found",
    });
  }

  //Extract Token
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      Error: "Unauthorized",
    });
  }

  //Verify Token
  try {
    const decoded = jwt.verify(token, SecretKey);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      Error: "Invalid Token",
    });
  }
};

//Generate Token
const generateToken = (userData)=>{
    return jwt.sign(userData,SecretKey,{expiresIn:'1h'});
}

module.exports={
    jwtAuthMiddleware,
    generateToken
};
