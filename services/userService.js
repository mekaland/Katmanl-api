const userRepository = require("../repositories/userRepository");

class UserService {
  async getAllUsers() {
    return await userRepository.getAllUsers();
  }

  async getUserById(id) {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
    return user;
  }

  async createUser(name, email) {
    return await userRepository.createUser(name, email);
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

module.exports = new UserService();
