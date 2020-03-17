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

  static async getOneCocktail(id) {
    try {
      let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      return await this.getWithAwait(url);
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }

  static async getOneAvgRating(id) {
    try {
      let avgRating = await db.one(
        `SELECT AVG(comment.rating) FROM comment
        WHERE comment.drink_id = ${id};`
        );
      return avgRating;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }

  static async addComment(profile_id, rating, title, review, drink_id) {
    try {
      const response = await db.one(
        `INSERT INTO comment (profile_id, rating, title, review, drink_id)
        VALUES ($1,$2,$3,$4,$5) RETURNING id`,
        [profile_id, rating, title, review, drink_id]
      );
      return response;
    } catch (error) {
      console.log("Error:", error);
      return error;
    }
  }

  static async getAllCommentsByID(id) {
    try {
      const response = await db.any(
        `SELECT comment.rating, comment.title, comment.review, comment.profile_id, 
        profile.user_name FROM comment INNER JOIN profile ON comment.profile_id = profile.id
        WHERE comment.drink_id = ${id}`
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
    }
  }

  static async searchById(id) {
    try {
      let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      return await this.getWithAwait(url);
    } catch (error) {
      console.error("ERROR", error);
      return error;
    }
  };

  static async exploreCocktails(letter) {
    try {
      let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
      return await this.getWithAwait(url);
    } catch (error) {
      console.error("Error", error);
    }
  };

  static async getRandomCocktail() {
    try {
      let url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
      return await this.getWithAwait(url);
    } catch (error) {
      console.error("ERROR", error);
      return error;
    }
  };
}

module.exports = DrinkModel;