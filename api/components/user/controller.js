const TABLE = "user";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  async function list() {
    return store.list(TABLE);
  }

  async function getById(id) {
    return store.getById(TABLE, id);
  }

  async function upsert(data) {
    return store.upsert(TABLE, data);
  }

  async function remove(id) {
    return store.remove(TABLE, id);
  }

  return {
    list,
    getById,
    upsert,
    remove,
  };
};
