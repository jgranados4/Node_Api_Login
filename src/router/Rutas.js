const express=require('express')
const loginController=require('../controllers/loginController')
const Router = express.Router();
//Rutas
Router.get('/',loginController.list);
Router.get('/get_login/:id',loginController.get)
Router.post('/add_login',loginController.save)
Router.post('/add_peso',loginController.saveP)
Router.post('/auth',loginController.auth)

module.exports=Router;