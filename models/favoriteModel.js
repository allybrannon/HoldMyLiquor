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
<<<<<<< HEAD
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
=======
            const response = await db.any(`
            SELECT DISTINCT drink_id FROM favorite 
            WHERE profile_id = ${profile_id};`)
            console.log(response);
>>>>>>> 130a46e805e7f18684ef8f0d1c25c330b85b9b31
            return response;
        } catch (error) {
            console.error("ERROR:", error);
            return error;
        }
    };

    // static async getUserFavoriteComments(profile_id){
    //     try {
    //         response.map(favorite => {

    //         })
    //     } catch (error) {
    //         console.error("ERROR:", error);
    //         return error;
    //     }
    // }

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
