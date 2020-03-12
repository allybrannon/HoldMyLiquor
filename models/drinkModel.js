"use strict";
const db = require("./conn"),
  fetch = require("node-fetch");

class DrinkModel {
  constructor(id) {
    this.id = id;
  }

  static async getWithAwait(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("ERROR: ", error);
      return error;
    }
  }

  static async getOneCocktail() {
    try {
      let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007`;
      return await this.getWithAwait(url);
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }
  static async addComment(user_id, r_id, title, review, drink_id) {
    try {
      const response = await db.one(
        `INSERT INTO comment (user_id, profile_id, title, review, drink_id)
                VALUES ($1,$2,$3,$4,$5) RETURNING id`,
        [user_id, r_id, title, review, drink_id]
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log("Error:", error);
      return error;
    }
  }

  static async getAllReviewsByID(id) {
    try {
      const response = await db.any(
        `SELECT comment.rating, comment.title, comment.review, comment.profile_id, 
        profile.user_name FROM comment INNER JOIN profile ON comment.profile_id = profile.id`
      );
      return response;
    } catch (error) {
      console.error("ERROR:", error);
    }
  }

  static async searchCocktails(cocktailName) {
    try {
      let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`;
      return await this.getWithAwait(url);
    } catch (error) {
      console.error("Error", error);
      return error;
    }
  }
  static async searchById(id) {
    try {
      let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      return await this.getWithAwait(url);
    } catch (error) {
      console.error("ERROR", error);
      return error;
    }
  }
}

module.exports = DrinkModel;