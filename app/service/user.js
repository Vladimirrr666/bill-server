"use strict";

const Service = require("egg").Service;

class UserService extends Service {
  async getUserByName(username) {
    const { app } = this;
    try {
      const result = app.mysql.get("user", { username });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async register(params) {
    const { app } = this;
    try {
      const result = app.mysql.insert("user", params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async updateUserInfo(params) {
    const { app } = this;
    try {
      const result = app.mysql.update("user", { ...params }, { id: params.id });
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = UserService;
