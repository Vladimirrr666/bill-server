"use strict";

module.exports = (secret) => {
  return async function jwtErr(ctx, next) {
    const token = ctx.request.header.authorization;
    let decode;
    // 如果没有token 返回的是'null'
    if (token && token !== "null") {
      try {
        decode = ctx.app.jwt.verify(token, secret);
        await next();
      } catch (err) {
        console.log(err);
        ctx.status = 200;
        ctx.body = {
          code: 401,
          msg: "token失效",
        };
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        msg: "token不存在",
        data: null,
      };
    }
  };
};
