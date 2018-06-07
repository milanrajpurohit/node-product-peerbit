/********************************
 PRODUCT ROUTING INITIALISATION
 ********************************/
module.exports = function(app, express) {

    // Imports Dependency, models and controllers
	const router                = express.Router();
    const config                = require('../../configs/configs');
    const Model                 = require("../models/Model");
    const ProductController     = require("../controllers/ProductController");
    const Product               = require("../models/ProductSchema").Product;
    const Token                 = require("../../configs/token");

    // Store Product Routing
    router.post('/product', Token.isAuthorised, (req, res, next) => {
        const ProductObj = (new ProductController(new Model(Product))).boot(req, res);
        return ProductObj.store();
    });

    // Get Products Routing
    router.get('/products', Token.isAuthorised, (req, res, next) => {
        const ProductObj = (new ProductController(new Model(Product))).boot(req, res);
        return ProductObj.collection();
    });

	app.use(config.baseApiUrl, router);

};