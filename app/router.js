"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret);
  router.post("/user/register", controller.user.register);
  router.post("/user/login", controller.user.login);
  router.post("/user/getUserInfo", _jwt, controller.user.getUserInfo);
  router.post("/user/updateUserInfo", _jwt, controller.user.updateUserInfo);
  router.post("/upload", _jwt, controller.upload.upload);
  router.post("/bill/add", _jwt, controller.bill.add);
  router.post("/bill/list", _jwt, controller.bill.list);
  router.post("/bill/detail", _jwt, controller.bill.detail);
  router.post("/bill/update", _jwt, controller.bill.update);
  router.post("/bill/detele", _jwt, controller.bill.delete);
};
