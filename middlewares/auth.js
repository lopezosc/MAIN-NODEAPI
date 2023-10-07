const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {  
  const authHeader = req.headers['authorization'] 
  const token = authHeader && authHeader.split(' ')[1] 

  if (token == null) {
    console.log("Token error!!!")
    console.log(authHeader)
    return res.sendStatus(401);
  }
  

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    
    if (err) return res.status(401).send({message:"Unauthorized!"});
    req.user = user.data;
    console.log("USER  SENT TRANSACTION REQUEST = " + req.user)
    next();
  });
}

function generateAccessToken(username) {
  return jwt.sign({ data: username }, process.env.TOKEN_SECRET, {
    expiresIn: "24h",
  });
}

module.exports = {
  authenticateToken,
  generateAccessToken,
};
