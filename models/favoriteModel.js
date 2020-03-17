"use strict";
const db = require("./conn"),
    fetch = require("node-fetch"),
    drinkModel = require("../models/drinkModel");

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

    static async getFavorites(profile_id) {
        try {
            const response = await db.any(`
            SELECT DISTINCT comment.drink_id, comment.title, comment.review, 
            comment.profile_id, comment.rating FROM favorite
            JOIN comment ON favorite.profile_id = comment.profile_id
            WHERE comment.profile_id = ${profile_id}
            ORDER BY rating DESC LIMIT 8;
            `);
            return response;
        } catch (error) {
            console.error("ERROR", error);
            return error;
        }
    };

    static async getFavoritesDrinkDetails(profile_id) {
        try {
            const favoriteList = await this.getFavorites(profile_id);
            const response = await Promise.all(favoriteList.map(async favorite => {
                return await drinkModel.getOneCocktail(favorite.drink_id);
            }));
            return response;
        } catch (error) {
            console.error("ERROR", error);
            return error;
        }
    }

    static async getUserComments(profile_id) {
        try {
            const response = await db.any(`
            SELECT comment.profile_id, comment.drink_id, comment.title,
            comment.review, comment.rating FROM favorite
            JOIN comment ON favorite.profile_id = comment.profile_id
            WHERE comment.profile_id = ${ profile_id }
            ORDER BY rating DESC LIMIT 5;
            `);
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
