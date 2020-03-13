const db = require("./conn"),
  bcrypt = require("bcryptjs");

class ProfileModel {
  constructor(id, first_name, last_name, user_name, password) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.user_name = user_name;
    this.password = password;
  }

  checkPassword(hashedPassword) {
    return bcrypt.compareSync(this.password, hashedPassword);
  }
  async addUser() {
    try {
      const response = await db.one(
        `INSERT INTO profile (first_name, last_name, user_name, password) VALUES ($1, $2, $3, $4) RETURNING id;`,
        [this.first_name, this.last_name, this.user_name, this.password]
      );
      return response;
    } catch (error) {
      console.error("ERROR: ", error);
      return error;
    }
  }
  async loginUser() {
    console.log("logging in user");
    try {
      const response = await db.one(
        `SELECT id, first_name, last_name, user_name, password FROM profile WHERE user_name = $1;`,
        [this.user_name]
      );
      const isValid = this.checkPassword(response.password);
      if (!!isValid) {
        const {
          id,
          first_name,
          last_name,
          user_name
        } = response;
        return {
          isValid,
          profile_id: id,
          first_name,
          last_name,
          user_name
        };
      } else {
        return {
          isValid
        };
      }
    } catch (error) {
      console.error("Error: ", error);
      return error;
    }
  }
}

module.exports = ProfileModel;