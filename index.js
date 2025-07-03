const express = require("express");
const debug = require("debug")("app:main");
const { connectDB } = require("./config/db");
const userRoutes = require("./controllers/userController");

const app = express();

app.use(express.json());
app.use("/users", userRoutes);

// Veritabanı bağlantısını başlat
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug(`API port ${port} üzerinde çalışıyor...`);
});
