const { Service } = require("egg");

class BillService extends Service {
  async add(params) {
    const { app } = this;
    try {
      const result = app.mysql.insert("bill", { ...params });
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async list(user_id) {
    const { app } = this;
    const QUERY_STR = "id, pay_type, amount, date, type_id, type_name, remark";
    try {
      const sql = `select ${QUERY_STR} from bill where user_id=${user_id}`;
      const result = await app.mysql.query(sql);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async detail(id, user_id) {
    const { app } = this;
    try {
      const result = app.mysql.get("bill", { id, user_id });
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async update(params) {
    const { app } = this;
    try {
      const result = app.mysql.update(
        "bill",
        { ...params },
        { id: params.id, user_id: params.user_id }
      );
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async delete(id, user_id) {
    const { app } = this;
    try {
      const result = app.mysql.delete("bill", { id, user_id });
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = BillService;
