import conn from "../../database/dbconnection.js"

const signUp = (req, res) => {
  try {
    const { name, email, age, password } = req.body
    if (!name || !email || !age || !password) {
      return res.status(400).json({ message: "All Inputs Required" })
    }
    const query = `insert into users (name,email,age,password) VALUES (?, ?, ?, ?)`
    conn.execute(query, [name, email, age, password], (err) => {
      if (err) {
        return res.status(500).json({ message: "Database Error", error: err.message })
      }
      res.status(201).json({ message: "Account Created Successfully." })
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export { signUp }
