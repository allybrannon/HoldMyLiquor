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
            SELECT DISTINCT drink_id FROM favorite 
            WHERE profile_id = ${profile_id};`)
            return response;
        } catch (error) {
            console.error("ERROR:", error);
            return error;
        }
    };

    static async getListOfUserFavorites(profile_id) {
        try {
            const response = await db.any(`
            SELECT DISTINCT comment.profile_id, comment.drink_id, comment.title,
            comment.review, comment.rating FROM favorite
            JOIN comment ON favorite.profile_id = comment.profile_id
            WHERE comment.profile_id = ${ profile_id }
            ORDER BY rating DESC LIMIT 5;`);
            return response;
        } catch (error) {
            console.error("ERROR: ", error);
            return error;
        }
    };
    
    static async getUserProfile(id) {
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
