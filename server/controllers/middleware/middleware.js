const authMessage = () => {
  return (req, res, next) => {
    if (req.user?.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware
    }

    // User is not authenticated or req.user is undefined
    // You might want to handle this case or redirect to a different route
    res.redirect("/"); // Redirect to the home page if not authenticated
  };
};

module.exports = {
  authMessage,
};
