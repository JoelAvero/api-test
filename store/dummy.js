const db = {
  user: [
    {
      id: "1",
      name: "John",
    },
    {
      id: "2",
      name: "Jane",
    },
    {
      id: "3",
      name: "Jim",
    },
  ],
};

async function list(table) {
  return db[table];
}

async function getById(table, id) {
  let data = await list(table);
  console.log("id =Z", id);
  return data.filter((item) => item.id === id)[0] || null;
}

async function upsert(table, data) {
  console.log(data);
  db[table].push(data);
  return data;
}

async function remove(table, id) {
  const data = await list(table);
  const filteredData = data.filter((item) => item.id !== id);
  db[table] = filteredData;
  return filteredData;
}

module.exports = {
  list,
  getById,
  upsert,
  remove,
};
