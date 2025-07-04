const { pool } = require("../config/db"); //config/db.js dosyasından pool nesnesini içe aktarır. Bu, PostgreSQL bağlantı havuzudur.
//: Veritabanına sorgu göndermek için kullanılır.
const debugDB = require("debug")("app:db"); //Veritabanı işlemlerinin durumunu (başarı/hata) konsolda gösterir.
const User = require("../entities/User"); //Veritabanı verilerini User nesnelerine dönüştürmek için kullanılır.

class UserRepository {
  async getAllUsers() {
    const result = await pool.query("SELECT * FROM users");
    debugDB(`Tüm kullanıcılar listelendi. Toplam: ${result.rows.length}`);
    return result.rows.map((row) => User.fromDatabase(row)); //result.rows veritabanı satırlarını içerir.User.fromDatabase(row) her satırı User nesnesine çevirir.
  }

  async getUserById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]); //$1 ile parametreli sorgu çalıştırır, id ile filtreler.
    if (result.rows.length === 0) {
      //Eğer satır yoksa (length === 0), null döner ve log yazar
      debugDB(`Kullanıcı bulunamadı: ID ${id}`);
      return null;
    }
    debugDB("Kullanıcı bulundu:", result.rows[0]);
    return User.fromDatabase(result.rows[0]); //Bulunan satır User.fromDatabase ile nesneye çevrilir.
  }

  async createUser(name, email) {
    const user = new User(null, name, email); //Yeni User nesnesi oluşturur, id null bırakılır (otomatik artar).
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", //INSERT ... RETURNING * ile veri ekler ve dönen satırı alır.
      [user.name, user.email]
    );
    debugDB("Yeni kullanıcı eklendi:", result.rows[0]);
    return User.fromDatabase(result.rows[0]); //User.fromDatabase ile nesne döner.
  }

  async updateUser(id, name, email) {
    const user = new User(id, name, email); //User nesnesi oluşturur ve UPDATE ile günceller.
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [user.name, user.email, id]
    );
    if (result.rowCount === 0) {
      //rowCount === 0 ise kullanıcı bulunamadı, null döner.
      debugDB(`Güncellenecek kullanıcı bulunamadı: ID ${id}`);
      return null;
    }
    debugDB("Kullanıcı güncellendi:", result.rows[0]);
    return User.fromDatabase(result.rows[0]);
  }

  async deleteUser(id) {
    //DELETE ile kullanıcı siler, RETURNING * silinen satırı döner.
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      debugDB(`Silinecek kullanıcı bulunamadı: ID ${id}`);
      return null;
    }
    debugDB(`Kullanıcı silindi: ID ${id}`);
    return User.fromDatabase(result.rows[0]);
  }
}

module.exports = new UserRepository(); //Açıklama: UserRepository sınıfından bir instance oluşturur ve dışa aktarır.
