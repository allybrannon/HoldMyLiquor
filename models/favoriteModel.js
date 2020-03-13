"use strict";
const db = require("./conn"),
    fetch = require("node-fetch");

class Favorite {
    constructor(id, profile_id, drink_id) {
        this.id = id;
        this.profile_id = profile_id;
        this.drink_id = drink_id;

    }
    static async getUserStuff() {
        try {
            const response = await db.one(`INSERT INTO favorite (profile_id, drink_id) VALUES ($1, $2) RETURN id;`, [this.profile_id, this.drink_id]);
            console.log('Favorite RESPONSE =', response);
            return response;
        } catch (error) {
            console.error('ERROR', error);
            return error;
        }
    }
}


module.exports = Favorite;