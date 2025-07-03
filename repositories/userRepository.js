const { pool } = require("../config/db");
const debugDB = require("debug")("app:db");

class UserRepository {
  async getAllUsers() {
    const result = await pool.query("SELECT * FROM users");
    debugDB(`Tüm kullanıcılar listelendi. Toplam: ${result.rows.length}`);
    return result.rows;
  }

  async getUserById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      debugDB(`Kullanıcı bulunamadı: ID ${id}`);
      return null;
    }
    debugDB("Kullanıcı bulundu:", result.rows[0]);
    return result.rows[0];
  }

  async createUser(name, email) {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    debugDB("Yeni kullanıcı eklendi:", result.rows[0]);
    return result.rows[0];
  }

  async updateUser(id, name, email) {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );
    if (result.rowCount === 0) {
      debugDB(`Güncellenecek kullanıcı bulunamadı: ID ${id}`);
      return null;
    }
    debugDB("Kullanıcı güncellendi:", result.rows[0]);
    return result.rows[0];
  }

  async deleteUser(id) {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      debugDB(`Silinecek kullanıcı bulunamadı: ID ${id}`);
      return null;
    }
    debugDB(`Kullanıcı silindi: ID ${id}`);
    return result.rows[0];
  }
}

module.exports = new UserRepository();
