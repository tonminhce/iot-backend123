const pool = require("../../db");

exports.initialDB = async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(100), email VARCHAR(100), password VARCHAR(100), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
    );
    await pool.query(
      `CREATE TABLE sensor_names(
        sensor_id SERIAL PRIMARY KEY,
        sensor_name VARCHAR(100)
      )`
    );
    await pool.query(
      `CREATE TABLE sensor_data(
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        sensor_id INTEGER,
        sensor_value FLOAT,
        recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (sensor_id) REFERENCES sensor_names(sensor_id)
      )`
    );
    await pool.query(
      `CREATE TABLE devices(
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        device_name VARCHAR(100),
        device_status BOOLEAN DEFAULT FALSE, -- 'FALSE' for OFF and 'TRUE' for ON
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )`
    );
    res.status(200).send({ message: "Successfully created table" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
