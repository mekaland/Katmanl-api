Katmanlı Mimari Node.js API
Node.js, Express ve PostgreSQL ile katmanlı mimariye sahip bir REST API.
Özellikler

Kullanıcılar için CRUD işlemleri (GET, POST, PUT, DELETE).
Katmanlı mimari (Controller, Service, Repository).
PostgreSQL veritabanı ve Docker entegrasyonu.
express-validator ile veri doğrulama.

Gereksinimler

Node.js 18+
Docker ve Docker Compose
Git

Kurulum

Repository'yi klonlayın:git clone https://github.com/mekaland/Katmanl-api.git
cd Katmanl-api


Bağımlılıkları yükleyin:npm install


.env dosyasını oluşturun:PGUSER=kullanici
PGPASSWORD=sifre
PGDATABASE=veritabani
PGHOST=postgres
PGPORT=5432
PORT=3000
DEBUG=app:*


Uygulamayı Docker Compose ile başlatın:docker-compose up -d


API'yi test edin (Postman veya curl ile):curl http://localhost:3002/users



API Endpoint'leri

GET /users: Tüm kullanıcıları listele veya ID ile filtrele (?id=1).
GET /users/:id: ID'ye göre kullanıcı getir.
POST /users: Yeni kullanıcı oluştur.
PUT /users/:id: Kullanıcı güncelle.
DELETE /users/:id: Kullanıcı sil.

Lisans
MIT License
