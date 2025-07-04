const { Pool } = require("pg"); //pg modülünden Pool sınıfını içe aktarıyor.
const debug = require("debug")("app:db"); //debug modülünü kullanarak loglama yapar.

const pool = new Pool({
  //Bir bağlantı havuzu (pool) oluşturur. Bu, birden fazla istemciye aynı anda veritabanı erişimi sağlar.
  user: process.env.PGUSER || "kullanici", //Veritabanı kullanıcısı. process.env.PGUSER ortam değişkeninden alınır, yoksa "kullanici" kullanılır.
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "veritabani",
  password: process.env.PGPASSWORD || "sifre",
  port: process.env.PGPORT || 5432,
});

async function connectDB() {
  //Bağlantının çalışıp çalışmadığını kontrol eder.
  try {
    const client = await pool.connect(); //Bağlantı başarılıysa log yazar ve client.release() ile istemciyi havuza geri bırakır. Bu, kaynakları serbest bırakır.
    debug("PostgreSQL bağlantısı başarılı");
    client.release();
  } catch (err) {
    debug("PostgreSQL bağlantı hatası:", err.message);
    process.exit(1);
  }
}

module.exports = { pool, connectDB }; //diğer dosyalarda kullanılmak üzere dışa aktarılır.

/*
Özet

    Bu dosya, PostgreSQL’e bağlantı kurar ve test eder.
    pool ile çoklu bağlantı sağlar, connectDB ile durumu kontrol eder.
    Loglama ile hata takibi yapar.
*/
