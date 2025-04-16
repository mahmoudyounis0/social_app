import conn from "../../database/dbconnection.js"

const getAllposts = (req, res) => {
    const query = 'select * from posts'
    conn.execute(query, (err, data) => {
        if (err) return res.status(400).json({ message: err.message })
        res.status(200).json({ message: "all posts", data: data })
    })
}
const addpost = (req, res) => {
    const { title, description, user_id } = req.body
    if (!title || !description || !user_id) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const query = 'insert into posts (title,description,user_id) values (?,?,?)'
    conn.execute(query, [title, description, user_id], (err, result) => {
        if (err) return res.status(400).json({ message: err.message });
        res.status(201).json({ message: "Added Succ" })
    })
}
const deletePost = (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: 'ID is required' })
    }
    const checkQuery = 'select * from posts where id = ?'
    conn.execute(checkQuery, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const deleteQuery = 'delete from posts where id = ?'
        conn.execute(deleteQuery, [id], (err) => {
            if (err) {
                res.status(500).json({ message: err.message })
            }
            res.status(200).json({ message: 'Deleted successfully' })
        })
    })

}
const updatePost = (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.json('ID is required')
    }
    const checkPostIndb = 'select * from posts where id=?'
    conn.execute(checkPostIndb, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Post Not Found" })
        }
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' })
        }
        const updateQuery = "UPDATE posts SET title = ?, description = ?  WHERE id = ?"
        conn.execute(updateQuery, [title, description, id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message })
            }
            res.status(200).json({ message: 'Post updated successfully' });
        })


    })
}
const getSinglePost = (req, res) => {
    const id = req.params.id
    if (!id || isNaN(id)) {
        return res.status(400).json({ message: 'Valid ID is required' })
    }
    const query = "select * from posts where id = ?"
    conn.execute(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        if (result.length === 0) {
            return res.status(400).json({ message: 'Post not found' })
        }
        res.status(200).json({ message: 'Post retrieved successfully', data: result[0] });
    })
}
export { getAllposts, addpost, deletePost, updatePost, getSinglePost}