const routes = [
  { href: "/auth/register", title: "Register" },
  { href: "/auth/login", title: "Login" },
  { href: "/auth/logout", title: "Logout" },
];

const authRoutes = [
  { href: "/auth/register", title: "Register" },
  { href: "/auth/login", title: "Login" },
  { href: "/auth/logout", title: "Logout" },
];

module.exports = function navLinks(req, res, next) {
  if (req.session.currentUser) {
    res.locals.routes = routes;
  } else {
    res.locals.routes = authRoutes;
  }
  // locals
  next();
};
