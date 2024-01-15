const withAuth = (req, res, next) => {
  // Check if the user is not logged in
  if (!req.session || !req.session.userId) {
    // Redirect them to the login page
    res.redirect('/login');
  } else {
    // User is logged in, proceed to the next middleware/route handler
    next();
  }
};

module.exports = withAuth;

