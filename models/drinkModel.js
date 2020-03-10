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
      console.log("data is ", data);
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
      console.error("ERROR: ", error);
      return error;
    }
  }
}

module.exports = DrinkModel;
