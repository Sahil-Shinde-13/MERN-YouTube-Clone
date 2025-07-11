
// Middleware to validate input during registration
export const validateRegisterInput = (req, res, next) => {
  const { username, email, password } = req.body;
  
   // Username validation
  if (!username || username.trim().length < 3) {
    return res.status(400).json({ field: "username", message: "Username must be at least 3 characters" });
  }

  // Email format validation
  const emailRegex = /\S+@\S+\.\S+/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ field: "email", message: "Invalid email address" });
  }

  // Password strength validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    return res.status(400).json({
      field: "password",
      message: "Password must include uppercase, lowercase, number, special character"
    });
  }

  next();
};