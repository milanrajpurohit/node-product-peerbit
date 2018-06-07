/****************************
 USER CONTROLLER
 ****************************/
const Controller    = require("./Controller");
const Token       = require("../../configs/token");
const bcrypt        = require('bcrypt')
const Authentication = require('../models/AuthenticationSchema').Authtokens;
const ObjectId = require('mongodb').ObjectID;
const _             = require("lodash");

class UserController extends Controller {

    constructor(repo) {
        super();
        this.repo = repo;
    }

    // Login Method
    async logIn() {
        let _this = this;

        try {
            // Validating Fields
            if (!this.req.body.email || !this.req.body.password)
                return _this.res.status(400).send({status: 0, message: 'Bad Request. Please send all credentials'});

            // Setting Filter and Projection Object
            let filter = { email: new RegExp('^'+this.req.body.email+'$', "i") };
            let projection = { _id: 1, email: 1, password: 1, name: 1 };

            // Calling User Model
            const user = await this.repo.findOne(filter, projection);
            if (_.isEmpty(user)) return _this.res.status(404).send({status: 0, message: 'User is not found.'});

            // Password Check
            const passwordCheck = await bcrypt.compare(this.req.body.password, user.password)
            if(!passwordCheck) return _this.res.status(401).send({status: 0, message: 'Authentication Failed, Invalid Password.'});

            // Generate Token
            const token = await (new Token()).generateToken(user._id);
            if(!token) throw 'Error in generating the token.';

            // Sending Success Response
            return _this.res.status(200).send({status: 1, message: "User has been authenticated successfully", data: { user, token }});

        } catch (err) {
            // Sending Error
            return _this.res.status(500).send({status: 0, message: err});
        }

    }

    // Logout Method
    async logOut() {
        let _this = this;

        try {
            // Validating Field
            if(!this.req.query.userId) return _this.res.status(400).send({status: 0, message: 'Bad request. Please send the user id'});

            // Setting filter object
            let filter = { _id: ObjectId(this.req.query.userId) };
            let projection = {_id: 1, email: 1};

            // Calling User Model
            const user = await this.repo.findOne(filter, projection);
            if (_.isEmpty(user)) return _this.res.status(404).send({status: 0, message: 'User is not found.'});

            // Remove Token
            const removeToken = await Authentication.remove({ userId: String(this.req.query.userId) });
            if(_.isEmpty(user)) throw 'Error in removing the token.';

            // Sending Success Response
            return _this.res.status(200).send({status: 1, message: "User logout successfully"});

        } catch (err) {
            // Sending Error
            return _this.res.status(500).send({status: 0, message: err});
        }

    }

}

module.exports = UserController;
