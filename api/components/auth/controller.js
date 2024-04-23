const auth = require("../../../auth");
const bcrypt = require("bcrypt");
const TABLE = "auth";
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  async function login(username, password) {
    const [data] = await store.query(TABLE, {
      username: username,
    });

    // TODO: mover toda esta logica
    const isValidPassword = await bcrypt.compare(password, data.password);

    if (isValidPassword) {
      return auth.sign(data);
    } else {
      return null;
    }
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
        authData.password = await bcrypt.hash(data.password, 5);
      }

      return store.upsert(TABLE, authData);
    } catch (error) {
      console.log("Err", error);
    }
  }

  return {
    upsert,
    login,
  };
};
