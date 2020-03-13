"use strict";
const db = require("./conn"),
    fetch = require("node-fetch");

class Favorite {
    constructor(id, profile_id, drink_id) {
        this.id = id;
        this.profile_id = profile_id;
        this.drink_id = drink_id;

    }
    static async getUserStuff(profile_id, drink_id) {
        try {
            const response = await db.one(`INSERT INTO favorite (profile_id, drink_id) VALUES ($1, $2) RETURNING id;`, [profile_id, drink_id]);
            console.log('Favorite RESPONSE =', response);
            return response;
        } catch (error) {
            console.error('ERROR', error);
            return error;
        }
    }
}


module.exports = Favorite;