const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port:dbConfig.PORT
});

// Open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// Player model
const Player = function(player) {
  this.name = player.name;
  this.team = player.team;
  this.role = player.role;
};

Player.create = (newPlayer, result) => {
  connection.query("INSERT INTO players SET ?", newPlayer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created player: ", { id: res.insertId, ...newPlayer });
    result(null, { id: res.insertId, ...newPlayer });
  });
};

Player.findById = (id, result) => {
  connection.query(`SELECT * FROM players WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found player: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Player.getAll = result => {
  connection.query("SELECT * FROM players", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("players: ", res);
    result(null, res);
  });
};

Player.updateById = (id, player, result) => {
  connection.query(
    "UPDATE players SET name = ?, team = ?, role = ? WHERE id = ?",
    [player.name, player.team, player.role, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated player: ", { id: id, ...player });
      result(null, { id: id, ...player });
    }
  );
};

Player.remove = (id, result) => {
  connection.query("DELETE FROM players WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted player with id: ", id);
    result(null, res);
  });
};

Player.removeAll = result => {
  connection.query("DELETE FROM players", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} players`);
    result(null, res);
  });
};

module.exports = Player;