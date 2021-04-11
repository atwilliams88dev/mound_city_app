const protection_middleware = function (options: [string]) {
  return async function (req, res, next) {
    if (!options.includes(res.locals.user_role)) {
      res.render("generic.njk", {
        title: "You are not authorized to view this page.",
        content: "If you believe this is a make please contact us.",
      });
      return;
    }
    next();
  };
};
export default protection_middleware;
