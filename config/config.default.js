/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1667975876303_3056";

  // add your middleware config here
  config.middleware = [];

  // 白名单
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ["*"], // 配置白名单
  };

  // 模板
  // config.view = {
  //   mapping: { ".html": "ejs" }, //左边写成.html后缀，会自动渲染.html文件
  // };

  // mysql
  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: "localhost",
      // 端口号
      port: "3306",
      // 用户名
      user: "root",
      // 密码
      password: "12345678", // 初始化密码，没设置的可以不写
      // 数据库名
      database: "juejue-cost", // 我们新建的数据库名称
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.cors = {
    origin: "*",
    credentials: true,
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };

  config.jwt = {
    secret: "Duweikang666",
  };

  config.multipart = {
    mode: "file",
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    uploadDir: "app/public/upload",
  };

  return {
    ...config,
    ...userConfig,
  };
};
