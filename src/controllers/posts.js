const cloudinary = require("cloudinary").v2;
const fs = require("@cyclic.sh/s3fs");
const path = require("path");
const { envData } = require("../../config");
const model = require("../models/posts");
const userModel = require("../models/users");

// Configuration
cloudinary.config({
  cloud_name: envData.cloudnaryName,
  api_key: envData.cloudnaryKey,
  api_secret: envData.cloudnarySecret,
});

const addPost = async (req, res) => {
  try {
    // getting data from user
    let { she, he, district, tehsil, state, date, image, verified } = req.body;

    if (req.user.role === "user") verified = false;

    // genrate public id save for cloudnary
    const publicId = Math.ceil(Math.random() * Date.now());

    // setting image and buffer
    const imageData = Buffer.from(image, "base64");
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "tmp",
      `image.${publicId}.jpg`
    );

    // save image to server
    fs.writeFile(imagePath, imageData, async (err) => {
      try {
        if (err) return res.status(500).json({ success: false });

        // save image to cloud
        const imageSaveCloudnary = await cloudinary.uploader.upload(imagePath, {
          public_id: publicId,
        });

        // delete image file from server
        fs.unlink(imagePath, async (err) => {
          try {
            if (err) return res.status(500).json({ success: false });

            // save to database
            await model.create({
              he,
              she,
              district,
              state,
              tehsil,
              date,
              userId: req.user._id,
              verified,
              image: imageSaveCloudnary.url,
              publicId,
            });
          } catch (error) {
            console.log(error);
          }
        });
      } catch (error) {
        console.log(error);
      }
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("error from adding post", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    // getting data from user
    let { she, he, district, tehsil, state, date, verified } = req.body;

    // find post
    const post = await model.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false });

    // save to database
    await model.findByIdAndUpdate(
      req.params.id,
      {
        he,
        she,
        district,
        state,
        tehsil,
        verified,
        date,
        userId: req.user._id,
      },
      { new: true }
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("error from update post", err.message);
    res.status(500).json({ success: false });
  }
};

const deletePost = async (req, res) => {
  try {
    // find post
    const post = await model.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false });

    // delete from mongodb
    await post.deleteOne();

    // delete image from cloudnary
    await cloudinary.uploader.destroy(post.publicId);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("err from delete post", err.message);
    res.status(500).json({ success: false });
  }
};

const likePost = async (req, res) => {
  try {
    // find post by id
    const post = await model.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false });

    let likes = [];
    // if already liked
    const isLiked = post.likes.find((item) => {
      if (!item) return {};
      const userId = String(req.user._id).split("(")[0];
      const userLikeId = String(item._id).split("(")[0];
      return userId === userLikeId;
    });

    if (isLiked) {
      likes = post.likes.filter((item) => {
        const userId = String(req.user._id).split("(")[0];
        const userLikeId = String(item._id).split("(")[0];
        return userId !== userLikeId;
      });
      post.likes = likes;
      await post.save();
      res.status(200).json({ success: true, like: -1 });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      res.status(200).json({ success: true, like: 1 });
    }
  } catch (error) {
    console.error("error from like post", error);
    res.status(500).json({ success: false });
  }
};

const deleteUser = async (req, res) => {
  try {
    // find post
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("err from delete post", err.message);
    res.status(500).json({ success: false });
  }
};

module.exports = {
  addPost,
  updatePost,
  deleteUser,
  likePost,
  deletePost,
};
