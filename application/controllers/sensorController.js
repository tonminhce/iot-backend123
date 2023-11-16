const pool = require("../../db");

exports.createSensorData = async (req, res) => {
  const { userId, data } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO sensors (userId, data) VALUES ($1, $2) RETURNING *",
      [userId, JSON.stringify(data)]
    );

    res.status(201).json({
      message: "Sensor data added successfully",
      sensorData: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSensorDataByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query("SELECT * FROM sensors WHERE userId = $1", [
      userId,
    ]);

    res.status(200).json({
      message: "Fetched sensor data successfully",
      sensorData: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
