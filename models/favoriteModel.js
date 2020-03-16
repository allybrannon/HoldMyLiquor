"use strict";
const db = require("./conn"),
    fetch = require("node-fetch");

class Favorite {
    constructor(id, profile_id, drink_id) {
        this.id = id;
        this.profile_id = profile_id;
        this.drink_id = drink_id;

    }
    static async addFavorite(profile_id, drink_id) {
        try {
            const response = await db.one(`INSERT INTO favorite (profile_id, drink_id) VALUES ($1, $2) RETURNING id;`, [profile_id, drink_id]);

            return response;
        } catch (error) {
            console.error('ERROR', error);
            return error;
        }
    }
    static async getUserFavorites(profile_id){
        try {
            const response = await db.any(`Select  Distinct comment.drink_id, comment.review, comment.profile_id,  comment.rating from favorite join comment on favorite.profile_id = comment.profile_id Where comment.profile_id = ${profile_id} Order by rating desc Limit 8;`)
            return response;
        } catch (error) {
            console.error("ERROR", error);
            return error;
        }
    }
    static async getListOfUserFavorites(profile_id){
        try {
            const response = await db.any(`Select  Distinct comment.profile_id, comment.rating, comment.drink_id, comment.rating from favorite join comment on favorite.profile_id = comment.profile_id Where comment.profile_id = ${profile_id} Order by rating desc Limit 5;`)
            return response;
        } catch (error) {
            console.error("ERROR", error);
            return error;
        }
    }
}


module.exports = Favorite;
