const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "104.131.66.109",
    user: "moe",
    password: "P@ssw0rd",
    database: "meal",
  },
});
// Check that the connection works
knex.raw("SELECT VERSION()").then(() => {
  console.log(`connection to db successful!`);
});

module.exports = knex;
