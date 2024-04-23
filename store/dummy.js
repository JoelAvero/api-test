const db = {
  user: [
    {
      id: "1",
      firstName: "John",
      username: "johndoe",
    },
    {
      id: "2",
      firstName: "Jane",
      username: "janedoe",
    },
    {
      id: "3",
      firstName: "Jim",
      username: "jimdoe",
    },
  ],
  auth: [
    {
      username: "johndoe",
      password: "$2b$05$q68u6FPPVn0PvfKmWxhDrO/5e4LtApzdAM2C7e/TIds3A1/ajLeA2",
    },
    {
      username: "janedoe",
      password: "$2b$05$q68u6FPPVn0PvfKmWxhDrO/5e4LtApzdAM2C7e/TIds3A1/ajLeA2",
    },
    {
      username: "jimdoe",
      password: "$2b$05$q68u6FPPVn0PvfKmWxhDrO/5e4LtApzdAM2C7e/TIds3A1/ajLeA2",
    },
  ],
};

async function list(table) {
  return db[table];
}

async function getById(table, id) {
  let data = await list(table);

  return data.filter((item) => item.id === id)[0] || null;
}

async function upsert(table, data) {
  if (!db[table]) {
    db[table] = [];
  }
  db[table].push(data);
  return data;
}

async function remove(table, id) {
  const data = await list(table);
  const filteredData = data.filter((item) => item.id !== id);
  db[table] = filteredData;
  return filteredData;
}

async function query(table, query) {
  const data = await list(table);
  return data.filter((item) => {
    for (const key in query) {
      if (item[key] !== query[key]) {
        return false;
      }
    }
    return true;
  });
}

module.exports = {
  list,
  getById,
  upsert,
  remove,
  query,
};
