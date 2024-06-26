const User = require("../models/user");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { passwordVerifier } = require("../utils/security-ground");

const token_issue = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, name: user.name, surname: user.surname },
    process.env.JWT_KEY,
    { expiresIn: 900 }
  );
  const refreshToken = jwt.sign(
    { id: user._id, name: user.name, surname: user.surname },
    process.env.JWT_KEY,
    { expiresIn: "1h" }
  );
  return { accessToken: accessToken, refreshToken: refreshToken };
};

const tokenChecker = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return { result: true, payload: decoded };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return { result: false, code: 2 };
    } else {
      return { result: false, code: 3 };
    }
  }
};

const tokenRefresher = (refreshToken) => {
  console.log("Refreshing token");
  const checkToken = tokenChecker(refreshToken);
  if (checkToken.result) {
    return {
      result: true,
      content: jwt.sign(checkToken.payload, process.env.JWT_KEY, {
        expiresIn: 900,
      }),
    };
  } else if (checkToken.code === 2) {
    return { result: false, content: "Token expired" };
  } else {
    return { result: false, content: "Token is invalid" };
  }
};

const authorize = (req, res, action) => {
  const tokens = req.cookies ? req.cookies.tokenCookie : undefined;
  if (tokens) {
    const checkAccess = tokenChecker(tokens.accessToken);
    if (checkAccess.result) {
      action();
    } else {
      const refreshAccess = tokenRefresher(tokens.refreshToken);
      if (refreshAccess.result) {
        res.cookie(
          "tokenCookie",
          {
            accessToken: refreshAccess.content,
            refreshToken: tokens.refreshToken,
          },
          {
            maxAge: 3600000,
            httpOnly: true,
            secure: false,
            sameSite: "none",
          }
        );
        action();
      } else {
        res.status(401).json(refreshAccess.content);
      }
    }
  } else {
    res.status(401).json("No token presented");
  }
};

async function createUser(req, res) {
  try {
    const { username, password, status, name, surname } = req.body;
    const newUser = new User({
      username: username,
      password: password,
      status: status,
      name: name,
      surname: surname,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
}

const verify_credentials = async (username, password) => {
  const user = await User.findOne({ username: username });
  if (user) {
    if (passwordVerifier(user.password, password)) return { code: 1, user: user };
    else return { code: 3, user: {} };
  } else {
    return { code: 2, user: {} };
  }
};

const login_process = async (username, password) => {
  const result = await verify_credentials(username, password);
  if (result.code === 1) {
    const token_obj = token_issue(result.user);
    return { message: "Successs", token_obj: token_obj };
  } else if (result.code === 2) {
    return { message: "User does not exist!", token_obj: {} };
  } else if (result.code === 3) {
    return { message: "Invalid password!", token_obj: {} };
  }
};

async function getUserByUsername(username) {
  const user = await User.find({ username: username });
  return user;
}

async function logOut(res) {
  res.cookie("tokenCookie", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "none"
});
}

async function deleteUser(userId) {
  const user = await User.findById(userId);
  await User.deleteOne();
}

async function editUser(userId, newInfo) {
  const response = { result: true, message: "Edited successfully!" };
  try {
    await User.findOneAndUpdate({ _id: userId }, { ...newInfo });
  } catch (err) {
    response.result = false;
    response.message = "Unable to edit due to an error!";
  }
  return response;
}

async function changePassword(userId, newPassword, oldPassword) {
  const user = await User.findById(userId);
  const response = { result: true, message: "Edited successfully!" };
  if (user) {
    if (passwordVerifier(user.password, oldPassword)) {
      if (newPassword !== oldPassword) {
        try{
          await User.findOneAndUpdate({ _id: userId }, { password: newPassword });
        } catch(err){
          response["result"] = false;
          response["message"] = "Unable to update due to an error!";
        }
      } else {
        response["result"] = false;
        response["message"] = "New password same with old password";
      }
    } else {
      response["result"] = false;
      response["message"] = "Wrong password entered";
    }
  } else {
    response["result"] = false;
    response["message"] = "User does not exist!";
  }
  return response
}

module.exports = {
  logOut,
  deleteUser,
  editUser,
  changePassword,
  createUser,
  verify_credentials,
  getUserByUsername,
  login_process,
  authorize,
};
