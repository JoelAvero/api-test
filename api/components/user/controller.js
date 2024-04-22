const { v4: uuidv4 } = require("uuid");
const auth = require("../auth");

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
    try {
      // TODO: Revisar todo esto y sacarlo de aca
      const user = {
        firstName: data.firstName,
        username: data.username,
      };

      if (data.id) {
        user.id = data.id;
      } else {
        user.id = uuidv4();
      }

      if (data.password || data.username) {
        await auth.upsert({
          id: user.id,
          username: user.username,
          password: data.password,
        });
      }

      return store.upsert(TABLE, user);
    } catch (error) {
      console.log("Err", error);
    }
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
