import conn from "../../database/dbconnection.js";

const searchForUser = (id) => {
    return new Promise((resolve, reject) => {
        const searchQuery = 'SELECT name FROM users WHERE id = ?';
        conn.execute(searchQuery, [id], (err, result) => {
            if (err) return reject(err);
            if (result.length === 0) return resolve(null);
            resolve(result[0]);
        });
    });
};
const getUserPosts = async (req, res) => {
    const userid = req.params.id;

    try {
        const user = await searchForUser(userid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const query = 'SELECT * FROM posts WHERE user_id = ?';
        conn.execute(query, [userid], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'No Available Posts' });
            }
            res.status(200).json({ message: 'Posts Retrieved Successfully', data: result });
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await searchForUser(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and Email required' });
        }

        const updateQuery = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
        conn.execute(updateQuery, [name, email, id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(200).json({ message: 'User updated successfully' });
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const deleteUser = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const user = await searchForUser(id)
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }
        const deleteQuery = 'delete from users where id = ?'
        conn.execute(deleteQuery, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message })
            }
            res.status(200).json({ message: "User Deleted Succfully" })
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

}
export { getUserPosts, updateUser, deleteUser }