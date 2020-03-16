"use strict";
const db = require("./conn"),
    fetch = require("node-fetch");

class Favorite {
    constructor(id, profile_id, drink_id) {
        this.id = id;
        this.profile_id = profile_id;
        this.drink_id = drink_id;
    };

    static async addFavorite(profile_id, drink_id) {
        try {
            const response = await db.one(`
            INSERT INTO favorite (profile_id, drink_id)
            VALUES ($1, $2) RETURNING id;`, [profile_id, drink_id]);
            return response;
        } catch (error) {
            console.error("ERROR:", error);
            return error;
        }
    };

    static async getUserFavorites(profile_id){
        try {
            const response = await db.any(`
            SELECT DISTINCT fav.drink_id, com.title, com.review, com.rating from profile pro
            JOIN favorite fav ON pro.id = fav.profile_id
            JOIN comment com ON fav.profile_id = com.profile_id
            WHERE pro.id = ${profile_id};`)
            console.log(response);
            return response;
        } catch (error) {
            console.error("ERROR:", error);
            return error;
        }
    };

    async getUserProfile(id) {
        try {
            const response = await db.any(`
            SELECT id, first_name, last_name, user_name FROM profile
            WHERE id = ${id};
            `);
            return response;
        } catch (error) {
            console.error("ERROR: ", error);
            return error;
        }
    }
}

module.exports = Favorite;
