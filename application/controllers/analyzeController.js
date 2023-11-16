const pool = require('../../db')

exports.getLatestSensorData = async (req, res) => {
  const { sensor_id } = req.params; 

  try {
    const result = await pool.query(
      `SELECT * FROM sensor_data
       WHERE sensor_id = $1
       ORDER BY recorded_at DESC
       LIMIT 20`,
      [sensor_id]
    );

    const sensorDataArray = result.rows;

    return res.status(200).json({
      message: "Data fetched successfully",
      data: sensorDataArray,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};