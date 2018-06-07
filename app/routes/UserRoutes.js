/********************************
 USERS ROUTING INITIALISATION
 ********************************/
module.exports = function(app, express) {

    // Imports Dependency, models and controllers
	const router                = express.Router();
    const config                = require('../../configs/configs');
    const Model                 = require("../models/Model");
    const UserController        = require("../controllers/UserController");
    const User                  = require("../models/UserSchema").User;

    // Login Routing
    router.post('/login', (req, res) => {
        const UserObj = (new UserController(new Model(User))).boot(req, res);
        return UserObj.logIn();
    });

    // Logout Routing
    router.get('/logout', (req, res) => {
        const UserObj = (new UserController(new Model(User))).boot(req, res);
        return UserObj.logOut();
    });

	app.use(config.baseApiUrl, router);

};