import express from 'express';
import Authorization from '../../../middlewares/auth';
import LoginController from '../controllers/auth.Controller';
const route = express.Router();
// route for testing 

route.get('/', (req,res) => res.json({data:'data'}));


/**
 * 
 * @route   POST api/login
 * @desc    Login a user and return a JWT token
 * @access  Public
*/

route.post('/', LoginController.login); // placeid
export default route;