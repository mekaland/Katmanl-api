const express = require("express"); //express modülünü içe aktarır. Bu, Node.js için web framework’üdür.
//HTTP sunucusu oluşturmak ve rotaları tanımlamak için kullanılır.
const debug = require("debug")("app:main");
const { connectDB } = require("./config/db"); //Uygulama başladığında veritabanına bağlanmayı sağlar.
const userRoutes = require("./controllers/userController"); ///users yolundaki HTTP isteklerini yönetir.

const app = express(); //Yeni bir Express uygulaması (sunucu) oluşturur.

app.use(express.json()); //req.body ile POST/PUT isteklerinden veri alınmasını sağlar.
app.use("/users", userRoutes);
///users yoluna userRoutes (kullanıcı controller’ı) rotalarını bağlar. Örneğin, /users/1 veya /users isteği buraya gelir.
//  Ne İşe Yarar?: Kullanıcıyla ilgili endpoint’leri (GET, POST, vb.) etkinleştirir.

// Veritabanı bağlantısını başlat
connectDB(); //Uygulama başladığında connectDB fonksiyonunu çağırı

const port = process.env.PORT || 3000; //ortam değişkeninden port numarasını alır, yoksa 3000 kullanır.
app.listen(port, () => {
  //Sunucuyu port numarasında başlatır. Başarılı olduğunda log yazar.
  debug(`API port ${port} üzerinde çalışıyor...`);
});
