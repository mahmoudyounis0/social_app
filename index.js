import express from "express"
import cors from "cors"
import signUpRouter from "./modules/signup/signup.route.js"
import signInRouter from "./modules/signin/signin.route.js"

// Initialize express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Environment variables
const port = process.env.PORT || 3000

// Routes
app.use("/auth/signup", signUpRouter)
app.use("/auth/signin", signInRouter)
// Basic routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Social API", status: "online" })
})

app.get("/home", (req, res) => {
  res.json({ message: "Home endpoint", status: "success" })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack)
  res.status(500).json({
    status: "error",
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "production" ? null : err.message,
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  })
})

// Start server
app.listen(port, () => console.log(`Server is running on port ${port}`))

export default app
