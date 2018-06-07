/****************************
 COMMON MODEL
 ****************************/
let _ = require("lodash");

class Model {

    constructor(collection) {
        this.collection = collection;
    }

    // Store Data
    store(data, options = {}) {

        return new Promise((resolve, reject) => {

            const collectionObject = new this.collection(data)

            collectionObject.save((err, createdObject) => {

                if (err) { return reject({message: err, status: 0 }); }

                return resolve(createdObject);
            });

        });
    }

    // Find all data
    find(filter = {}, project = {}) {

        return new Promise((resolve, reject) => {

            this.collection.find(filter, project).exec((err, data) => {

                if (err) { return reject({message: err, status: 0 }); }

                return resolve(data);
            });

        });

    }

    // Find single data
    findOne(filter = {}, project = {}) {

        return new Promise((resolve, reject) => {

            this.collection.findOne(filter, project).exec((err, data) => {

                if (err) { return reject({message: err, status: 0 }); }

                return resolve(data);
            });

        });
    }

    // Update Data
    update(filter, data) {

        return new Promise((resolve, reject) => {

            this.collection.findOneAndUpdate(filter, {$set: data}, { new: true }, (err, data)  => {

                if (err) { return reject({message: err, status: 0 }); }

                return resolve(data);

            });

        });

    }

    // Delete Data
    destroy(filter) {

        return new Promise((resolve, reject) => {

            this.collection.remove(filter).exec((err, data) => {

                if (err) { return reject({message: err, status: 0 }); }

                return resolve(data);
            });

        });
    }

}

module.exports = Model;