const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { addToBlacklist } = require("../middleware/tokenBlacklist");

exports.signup = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashed, role });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ error: "Email might be taken" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.logout = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(204); // No content

  const token = authHeader.split(" ")[1];
  addToBlacklist(token);

  res.status(200).json({ message: "Logged out successfully" });
};
