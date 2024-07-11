const User = require('../models/user');

const getUser = async (req, res) => {
  const { email} = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }
    res.json({ name: user.name, email: user.email, bio: user.bio }); // Highlighted change
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' }); // Highlighted change
  }
};

const updateUser = async (req, res) => {
  const { email, name, bio } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' }); // Highlighted change
    }

    user.name = name;
    user.bio = bio;
    await user.save();

    res.json({
      success: true,
      user: { name: user.name, email: user.email, bio: user.bio },
    }); // Highlighted change
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' }); // Highlighted change
  }
};

module.exports = {
  getUser,
  updateUser,
};
