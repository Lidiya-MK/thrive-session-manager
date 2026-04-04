const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;





// ****** WHat we did earlier ******

// const jwt=require('jsonwebtoken');

// exports.protect = (role) => {
// return (req,res,next)=>{
//     const authHeader=req.headers.authorization||'';
//     const token=authHeader.startsWith('Bearer ')
//     ? authHeader.split(' ')[1]
//     :null;


//     if(!token){
//         return res.status(401).json({message:'No token provided, authorization denied'});
//     }
//     try{
//         const decoded=jwt.verify(token,process.env.JWT_SECRET);
//         req.user=decoded;
//         next();
//     }catch(error){
//        return res.status(401).json({message:'Invalid token, authorization denied'});
//     }
// };
// };


// Why it didn't work

// The issue was that the earlier implementation has a "role" paramemeter in the "protect" function, but it was not being used anywhere in the function. This means that the middleware was not checking for the user's role, which is necessary for authorization.