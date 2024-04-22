const TABLE = "auth";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }
  async function upsert(data) {
    try {
      const authData = {
        id: data.id,
      };
      if (data.username) {
        authData.username = data.username;
      }
      if (data.password) {
        authData.password = data.password;
      }

      return store.upsert(TABLE, authData);
    } catch (error) {
      console.log("Err", error);
    }
  }

  return {
    upsert,
  };
};
