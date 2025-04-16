import conn from "../../database/dbconnection.js"

const signIn = (req, res) => {
  const email = req.body.email
  const query = "select id, name from users where email = ?"
  conn.execute(query, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }
    res.status(200).json({ message: "Logged In Successfully", data: result[0] })
  })
}

export { signIn }
