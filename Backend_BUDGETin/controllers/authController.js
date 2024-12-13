const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");

// Fungsi register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Fungsi login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = generateToken({ id: user._id });

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Fungsi logout
exports.logout = (req, res) => {
  res.status(200).json({ message: "Logout successful." });
};

// Fungsi getUserDetails
exports.getUserDetails = async (req, res) => {
  try {
    // Memastikan req.user.id ada dan valid
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "User information missing." });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Mengembalikan data pengguna tanpa password
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Fungsi getProfile
exports.getProfile = async (req, res) => {
  try {
    res.status(200).json({ message: "Profile fetched successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
