import mysql from "mysql2"

const conn = mysql.createPool({
  host: "bdwboplqqxeaxpvkyzwx-mysql.services.clever-cloud.com",
  user: "urxltrslsit1iocb",
  password: "oYNyM0Zcdds6dF3DN4sa",
  database: "bdwboplqqxeaxpvkyzwx",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

conn.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection error:", err)
    return
  }
  console.log("Database connected successfully")
  connection.release()
})

export default conn
