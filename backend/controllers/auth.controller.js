import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register a new user
export const register = async (req,res) =>{
    try {
        const {username, email, password} = req.body;
        
        // Check if user already exists
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({message: "User already exists"});
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!passwordRegex.test(password)) {
             return res.status(400).json({
                field: "password",
                message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
            });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, email, password: hashedPassword});

        // Save user to DB
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

// Login user and return JWT token
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password presence
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ field: "email", message: "No user found with this email" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ field: "password", message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
