const userRepository = require("../repositories/userRepository"); //Veritabanı erişimi için repository ile iletişim kurar.
const User = require("../entities/User"); //Kullanıcı verilerini temsil eden nesneyle çalışır

class UserService {
  async getAllUsers() {
    //Tüm kullanıcıları almak için repository’den veri çeker
    return await userRepository.getAllUsers();
  }

  async getUserById(id) {
    //id ile ile belirli bir kullanıcıyı çeker.
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
    return user;
  }

  async createUser(name, email) {
    return await userRepository.createUser(name, email); //userRepository.createUser(name, email) metodunu çağırır ve sonucunu döndürür.
  }

  async updateUser(id, name, email) {
    const user = await userRepository.updateUser(id, name, email);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
    return user;
  }

  async deleteUser(id) {
    const user = await userRepository.deleteUser(id);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
    return { message: "Kullanıcı silindi" };
  }
}

module.exports = new UserService(); //UserService sınıfından bir instance oluşturur ve dışa aktarır.
