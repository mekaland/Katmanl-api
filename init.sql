CREATE TABLE IF NOT EXISTS users (       /*users tablosunu oluşturur veya varlığını kontrol eder*/
  id SERIAL PRIMARY KEY, /*Her kullanıcıyı benzersiz bir şekilde tanımlar.*/
  name VARCHAR(100), /*Kullanıcının adını saklar.*/
  email VARCHAR(100) UNIQUE /*Kullanıcının email adresini saklar ve yinelenmesini önler. */
);