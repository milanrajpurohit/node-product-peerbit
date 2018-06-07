/****************************
 PRODUCT CONTROLLER
 ****************************/
const Controller    = require("./Controller");
const _             = require("lodash");

class ProductController extends Controller {

    constructor(repo) {
        super();
        this.repo = repo;
    }

    // Store Product
    async store() {
        let _this = this;

        try {
            // Setting the filter field
            const filter = { name: this.req.body.name, categoryId: this.req.body.categoryId };

            // Calling Product Find Model
            const product = await this.repo.findOne(filter);
            if (!_.isEmpty(product)) throw 'Product already exist.';

            // Setting Product Data
            const productData = {};
            (this.req.body.name) ? (productData.name = this.req.body.name) : delete productData.name;
            (this.req.body.description) ? (productData.description = this.req.body.description) : delete productData.description;
            (this.req.body.price) ? (productData.price = this.req.body.price) : delete productData.price;
            (this.req.body.manufacturer) ? (productData.manufacturer = this.req.body.manufacturer) : delete productData.manufacturer;
            (this.req.body.categoryId) ? (productData.categoryId = this.req.body.categoryId) : delete productData.categoryId;

            // Calling Product Save Model
            const productNewObject = await this.repo.store(productData);
            if (_.isEmpty(productNewObject)) throw "Error in saving the Product";

            // Sending success response
            return _this.res.status(201).send({status: 1, message: "Product saved successfully.", data: productNewObject});

        } catch (err) {
            // Sending error
            return _this.res.status(500).send({status: 0, message: err});
        }

    }

    // Get Products
    async collection() {
        let _this = this;

        try {
            // Calling Product Model
            const products =  await this.repo.find();
            if (!products) return _this.res.status(404).send({status: 1, message: `Products are not found.`});

            // Sending success response
            return _this.res.status(200).send({status: 1, message: "Products found successfully", data: products});

        } catch (err) {
            // Sending error
            return _this.res.status(500).send({status: 0, message: err});
        }

    }

}

module.exports = ProductController;
