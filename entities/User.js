class User {
  constructor(id, name, email) {
    //sınıfın oluşturulduğunda çalışır. id, name ve email parametrelerini alır ve nesnenin özelliklerine (this) atar.
    this.id = id;
    this.name = name;
    this.email = email;
  }

  toDatabase() {
    //toDatabase metodu, nesnenin verilerini bir JSON nesnesine çevirir.
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }

  static fromDatabase(row) {
    //Veritabanından gelen bir satır (row) alır ve User nesnesine dönüştürür.
    return new User(row.id, row.name, row.email);
  }
}

module.exports = User;
