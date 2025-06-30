const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        req.flash('error', 'Unauthorized access');

        // Redirect back to the referring page
        const backURL = req.get('referer') || '/';
        return res.redirect(backURL);
      }
      next();
    } catch (err) {
      console.error('Authorization Error:', err);
      res.status(500).send('Internal Server Error');
    }
  };
};

module.exports = authorizeRole;
