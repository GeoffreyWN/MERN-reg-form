const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/register", async (req, res) => {
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
      password: await bcrypt.hash(password, 8),
    });

    await user.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).send("Server error occurred");
  }
});

router.post('/login', async (req, res) => {
  const {email} = req.body;
  try {
    const user =  await User.findOne({ email });
    if (!user) {
      return res.status(404).json({'msg': `User with email ${email} does not exist`})
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)

    if (!isMatch) {
      return res.status(400).json({'msg': `Invalid credentials`})
    }
    const { password, ...rest } = user.toObject()
    return res.send(rest)

  } catch (error) {
    console.log(error)
    res.status(500).json({error});
  }
})

module.exports = router;
