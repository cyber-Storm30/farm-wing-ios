import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json("You are not yet registered");
    }
    const validated = await bcrypt.compare(password, user.password);
    if (!validated) {
      return res.status(403).json("Wrong credentials");
    } else {
      const newUser = user._doc;
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, image, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name: name,
      email: email,
      image: image,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  console.log(req.body);
  try {
    const { userId, username, email, password, img } = req.body;
    const oldUser = await User.findById(userId);
    if (!oldUser) {
      res.status(404).json("User not found");
    } else {
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(password, salt);
      // const newUser = await oldUser.updateOne({
      //   name: username,
      //   email: email,
      //   password: hashedPassword,
      //   image: img,
      // });
      // res.status(200).json(newUser);
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
