const { Pool } = require("pg");
const debug = require("debug")("app:db");

const pool = new Pool({
  user: process.env.PGUSER || "kullanici",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "veritabani",
  password: process.env.PGPASSWORD || "sifre",
  port: process.env.PGPORT || 5432,
});

async function connectDB() {
  try {
    const client = await pool.connect();
    debug("PostgreSQL bağlantısı başarılı");
    client.release();
  } catch (err) {
    debug("PostgreSQL bağlantı hatası:", err.message);
    process.exit(1);
  }
}

module.exports = { pool, connectDB };
