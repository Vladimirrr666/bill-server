"use strict";

const fs = require("fs");
const path = require("path");
const moment = require("moment");
const mkdirp = require("mkdirp");

const { Controller } = require("egg");

class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    let uploadDir = "";
    try {
      let f = fs.readFileSync(file.filepath);
      let day = moment(new Date()).format("YYYYMMDD");
      let dir = path.join(this.config.uploadDir, day);
      let date = Date.now();
      await mkdirp(dir);
      uploadDir = path.join(dir, date + path.extname(file.filename));
      fs.writeFileSync(uploadDir, f);
      ctx.body = {
        code: 200,
        msg: "上传成功",
        data: uploadDir.replace(/app/g, ""),
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: 500,
        msg: "上传失败",
        data: null,
      };
    } finally {
      ctx.cleanupRequestFiles();
    }
  }
}

module.exports = UploadController;
