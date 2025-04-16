import conn from "../database/dbconnection.js"
import bcrypt from "bcrypt"

const authSignUpMiddleware = (req, res, next) => {
  const email = req.body.email
  if (!email) {
    return res.status(400).json({ message: "Email Required" })
  }

  const query = `select email from users where email=?`
  conn.execute(query, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "Email Already Exists" })
    }

    if (!req.body.password) {
      return res.status(400).json({ message: "Password Required" })
    }

    req.body.password = bcrypt.hashSync(req.body.password, 8)
    next()
  })
}

const authSignInMiddleware = (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: "Email And Password Required" })
  }

  const query = "select email, password from users where email = ?"
  conn.execute(query, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Incorrect Email Or Password" })
    }

    const dbPassword = result[0].password
    const isPasswordCorrect = bcrypt.compareSync(password, dbPassword)

    if (isPasswordCorrect) {
      next()
    } else {
      res.status(401).json({ message: "Incorrect Email Or Password" })
    }
  })
}

export { authSignUpMiddleware, authSignInMiddleware }
