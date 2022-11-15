const moment = require("moment");
const { Controller } = require("egg");

class BillController extends Controller {
  async add() {
    const { ctx, app } = this;
    const {
      amount,
      type_id,
      type_name,
      date,
      pay_type,
      remark = "",
    } = ctx.request.body;
    const token = ctx.request.header.authorization;
    if (!amount || !type_id || !type_name || !date || !pay_type) {
      ctx.body = {
        code: 500,
        msg: "参数错误",
        data: null,
      };
      return;
    }
    let user_id;
    try {
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      user_id = decode.id;
      const result = await ctx.service.bill.add({
        amount,
        type_id,
        type_name,
        date,
        pay_type,
        remark,
        user_id,
      });
      ctx.body = {
        code: 200,
        msg: "添加成功",
        data: null,
      };
    } catch (err) {
      ctx.body = {
        code: 500,
        msg: "系统错误",
        data: null,
      };
    }
  }
  async list() {
    const { ctx, app } = this;
    const { date, type_id = "all", page, size } = ctx.request.body;
    const token = ctx.request.header.authorization;
    let user_id;
    try {
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      user_id = decode.id;
      const list = await ctx.service.bill.list(user_id);
      //按月份和类型筛选
      const _list = list.filter((item) => {
        if (type_id !== "all") {
          return (
            moment(Number(item.date)).format("YYYY-MM") === date &&
            item.type_id === type_id
          );
        }
        return moment(Number(item.date)).format("YYYY-MM") === date;
      });
      console.log(_list);
      //构建数据
      const listMap = _list
        .reduce((curr, item) => {
          const date = moment(Number(item.date)).format("YYYY-MM-DD");
          if (!curr.length) {
            curr.push({
              date,
              bills: [item],
            });
          } else if (curr.some((item) => item.date === date)) {
            const idx = curr.findIndex((item) => item.date === date);
            curr[idx].bills.push(item);
          } else if (!curr.some((item) => item.date === date)) {
            curr.push({
              date,
              bills: [item],
            });
          }
          return curr;
        }, [])
        .sort((a, b) => moment(b.date) - moment(a.date));
      const filterListMap = listMap.slice((page - 1) * size, page * size);
      const __list = list.filter(
        (item) => moment(Number(item.date)).format("YYYY-MM") === date
      );
      let totalExpense = 0;
      let totalIncome = 0;
      __list.forEach((item) => {
        if (item.type_id === 1) {
          totalExpense += Number(item.amount);
        } else if (item.type_id === 2) {
          totalIncome += Number(item.amount);
        }
      });
      ctx.body = {
        code: 200,
        msg: "success",
        data: {
          totalExpense,
          totalIncome,
          total: __list.length,
          current: Number(page),
          size: Number(size),
          list: filterListMap || [],
        },
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: 500,
        msg: "系统错误",
        data: null,
      };
    }
  }
  async detail() {
    const { ctx, app } = this;
    const { id = "" } = ctx.request.body;
    const token = ctx.request.header.authorization;
    if (!id) {
      ctx.body = {
        code: 500,
        msg: "账单id不能为空",
        data: null,
      };
      return;
    }
    let user_id;
    try {
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      user_id = decode.id;
      const info = await ctx.service.bill.detail(id, user_id);
      ctx.body = {
        code: 200,
        msg: "成功",
        data: info,
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: 500,
        msg: "系统错误",
        data: null,
      };
    }
  }
  async update() {
    const { ctx, app } = this;
    const {
      id,
      amount,
      type_id,
      type_name,
      date,
      pay_type,
      remark = "",
    } = ctx.request.body;
    const token = ctx.request.header.authorization;
    if (!id || !amount || !type_id || !type_name || !date || !pay_type) {
      ctx.body = {
        code: 500,
        msg: "参数错误",
        data: null,
      };
      return;
    }
    let user_id;
    try {
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      user_id = decode.id;
      const info = await ctx.service.bill.update({
        id,
        amount,
        type_id,
        type_name,
        date,
        pay_type,
        remark,
        user_id,
      });
      ctx.body = {
        code: 200,
        msg: "成功",
        data: info,
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: 500,
        msg: "系统错误",
        data: null,
      };
    }
  }
  async delete() {
    const { ctx, app } = this;
    const { id = "" } = ctx.request.body;
    const token = ctx.request.header.authorization;
    if (!id) {
      ctx.body = {
        code: 500,
        msg: "账单id不能为空",
        data: null,
      };
      return;
    }
    let user_id;
    try {
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      user_id = decode.id;
      const info = await ctx.service.bill.delete(id, user_id);
      ctx.body = {
        code: 200,
        msg: "成功",
        data: info,
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: 500,
        msg: "系统错误",
        data: null,
      };
    }
  }
}

module.exports = BillController;
