const ACL = require("./index.js");
const MD5 = require("md5");
const basicAuth = require("express-basic-auth");
const UserService = require("../user-service");

// Check if user name and password match -- used in basicAuth mw
function authorizer(username, password) {
  const currentUserPassword = ACL.users[username];
  if (!currentUserPassword) return false;

  if (currentUserPassword !== MD5(password)) {
    return false;
  }

  return true;
}

const injectUserMW = (req, res, next) => {
  req.currentUser = UserService.getByUsername(req.auth.user);
  console.log(`Found user ${req.currentUser.username}`);
  req.currentUser.sessionToken = next();
};

const basicAuthInstance = basicAuth({ authorizer });

function basicAuthWrapper(req, res, next) {
  //TODO: Check if session exists

  return basicAuthInstance(req, res, next);
}

// extract basic auth info from request
//New user instance after basic auth from auth info
module.exports = [basicAuthWrapper, injectUserMW];
