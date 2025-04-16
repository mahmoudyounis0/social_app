import mysql from "mysql2"

// It's better to use environment variables for database credentials
// but for now we'll use the existing connection string
const conn = mysql.createConnection(
  "mysql://urxltrslsit1iocb:oYNyM0Zcdds6dF3DN4sa@bdwboplqqxeaxpvkyzwx-mysql.services.clever-cloud.com:3306/bdwboplqqxeaxpvkyzwx",
)

conn.connect((err) => {
  if (err) {
    console.error("Database connection error:", err)
    return
  }
  console.log("Database connected successfully")
})

export default conn
