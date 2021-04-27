const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    email,
    password,
    first_name,
    last_name,
    country,
    state,
    city,
  } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    return res
      .status(400)
      .json({ msg: `User with email: ${email} already exists ` });
  }

  try {
    user = new User({
      first_name: first_name,
      last_name: last_name,
      country: country,
      state: state,
      city: city,
      email: email,
      password: await bcrypt.hash(password, 0),
    });

    await user.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).send("Server error occurred");
  }
});

module.exports = router;
