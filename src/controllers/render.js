const model = require("../models/posts");
const userModel = require("../models/users");

// title, dec, image, url,
const login = (req, res) => {
  if (req.token) return res.redirect("/");
  res.render("pages/login", { hello: "sat saheb" });
};

const addPost = async (req, res) => {
  const data = {
    inputData: [
      {
        type: "text",
        id: "he",
        label: "He Name",
        placeholder: "Ex : Ayush Singh",
        svg: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
      },
      {
        type: "text",
        id: "she",
        label: "She Name",
        placeholder: "Ex : Ayushi Singh",
        svg: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
      },
      {
        type: "text",
        id: "state",
        label: "State name",
        placeholder: "Ex : Uttar Pradesh",
        svg: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
      },
      {
        type: "text",
        id: "district",
        label: "District name",
        placeholder: "Ex : Lucknow",
        svg: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
      },
      {
        type: "date",
        id: "date",
        label: "Marriage date",
        placeholder: "Ex : 01/01/2023",
        svg: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z",
      },
      {
        type: "file",
      },
      {
        type: "checkbox",
      },
    ],
    headTitle: "Add Your Image",
    headDec: "this is page for adding your own image on my site",
    headImage: "/images/head.blog.jpg",
    headUrl: "https://fjxo39-3001.csb.app/add",
    user: req.user,
  };
  res.render("pages/addPost", data);
};

const post = async (req, res) => {
  try {
    const getPost = await model.findById(req.params.id).populate("userId");
    if (!getPost) {
      return res.status(404).res.redirect("/");
    }

    const data = {
      user: req.user,
      item: getPost,
    };

    res.render(`pages/post`, data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const getPost = await model.findById(req.params.id);
    if (!getPost) {
      return res.status(404).res.redirect("/");
    }

    const now = new Date(getPost.date);
    const dateString = now.toISOString().substring(0, 10);

    const data = {
      inputData: [
        {
          type: "text",
          value: getPost.he,
          id: "he",
          label: "He Name",
          placeholder: "Ex : Ayush Singh",
          svg: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
        },
        {
          type: "text",
          id: "she",
          value: getPost.she,
          label: "She Name",
          placeholder: "Ex : Ayushi Singh",
          svg: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
        },
        {
          type: "text",
          id: "state",
          value: getPost.state,
          label: "State name",
          placeholder: "Ex : Uttar Pradesh",
          svg: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
        },
        {
          type: "text",
          id: "district",
          value: getPost.district,
          label: "District name",
          placeholder: "Ex : Lucknow",
          svg: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
        },
        {
          type: "date",
          id: "date",
          value: dateString,
          label: "Marriage date",
          placeholder: "Ex : 01/01/2023",
          svg: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z",
        },
        {
          id: "image",
          type: "file",
          value: getPost.image,
        },
        {
          type: "checkbox",
          value: getPost.varified,
        },
      ],
      user: req.user,
    };

    let obj = { ...getPost._doc };
    res.render(`pages/updatePost`, { ...obj, ...data });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const profile = async (req, res) => {
  try {
    // console.log("hello", req.params.id)
    const paramsUser = await userModel.findById(req.params.id);
    if (!paramsUser) return res.redirect("/");

    // Set default values for pagination
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    // Get total number of posts that match filter
    const totalData = await model.countDocuments({ userId: req.params.id });

    // Get total number of pages based on limit
    const totalPages = Math.ceil(totalData / limit);

    // Calculate skip value based on page and limit
    const skip = (page - 1) * limit;

    // Get posts based on filter, skip, and limit
    const posts = await model
      .find({ userId: req.params.id })
      .skip(skip)
      .limit(limit)
      .populate("userId")
      .sort({ timestamp: -1 });

    // Return response with posts, pagination info, and success status
    const sendData = {
      success: true,
      data: posts,
      totalData: totalData,
      totalPages: totalPages,
      currentPage: page,
      user: req.user,
      headUrl: `/user/${req.params.id}`,
      headTitle: `Dowry Free Move User - ${paramsUser.name} Ji`,
      headImage: paramsUser.avatar.replace("=s96-c", ""),
      headDec: `${paramsUser.name} is Dowry free marriage community user. you can also join this community.`,
    };

    const data = {
      user: req.user,
      paramsUser,
      ...sendData,
    };

    res.render("pages/profile", data);
  } catch (err) {
    console.log("profile");
    console.log(err.message);
  }
};

const home = async (req, res) => {
  try {
    // Set default values for pagination
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    // Create filter object based on query params
    const filter = { varified: true };
    if (req.query.she) {
      filter.she = req.query.she;
    }
    if (req.query.he) {
      filter.he = req.query.he;
    }
    if (req.query.district) {
      filter.district = req.query.district;
    }
    if (req.query.state) {
      filter.state = req.query.state;
    }

    // Get total number of posts that match filter
    const totalData = await model.countDocuments({ verified: true });

    // Get total number of pages based on limit
    const totalPages = Math.ceil(totalData / limit);

    // Calculate skip value based on page and limit
    const skip = (page - 1) * limit;

    // Get posts based on filter, skip, and limit
    const posts = await model
      .find({ verified: true })
      .skip(skip)
      .limit(limit)
      .populate("userId")
      .sort({ timestamp: -1 });

    // Return response with posts, pagination info, and success status
    const sendData = {
      success: true,
      data: posts,
      totalData: totalData,
      totalPages: totalPages,
      currentPage: page,
      user: req.user,
    };

    res.render("pages/index", sendData);
  } catch (err) {
    console.log("home");
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const pendingPost = async (req, res) => {
  try {
    // Set default values for pagination
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    // Get total number of posts that match filter
    const totalData = await model.countDocuments({ verified: false });

    // Get total number of pages based on limit
    const totalPages = Math.ceil(totalData / limit);

    // Calculate skip value based on page and limit
    const skip = (page - 1) * limit;

    // Get posts based on filter, skip, and limit
    const posts = await model
      .find({ verified: false })
      .skip(skip)
      .limit(limit)
      .populate("userId");

    // Return response with posts, pagination info, and success status
    const sendData = {
      success: true,
      data: posts,
      totalData: totalData,
      totalPages: totalPages,
      currentPage: page,
      user: req.user,
    };

    res.render("pages/pendingPost", sendData);
  } catch (err) {
    console.log("home");
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const users = async (req, res) => {
  try {
    // Set default values for pagination
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    // Get total number of posts that match filter
    const totalData = await userModel.countDocuments();

    // Get total number of pages based on limit
    const totalPages = Math.ceil(totalData / limit);

    // Calculate skip value based on page and limit
    const skip = (page - 1) * limit;

    // Get posts based on filter, skip, and limit
    const users = await userModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 });

    // Return response with posts, pagination info, and success status
    const sendData = {
      success: true,
      data: users,
      totalData: totalData,
      totalPages: totalPages,
      currentPage: page,
      user: req.user,
    };

    res.render("pages/users", sendData);
  } catch (err) {
    console.log("home");
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  login,
  home,
  addPost,
  post,
  updatePost,
  pendingPost,
  users,
  profile,
};
