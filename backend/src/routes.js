const {Router} = require("express");
const routes = Router();
const DevController = require("./controllers/DevController");
const searchController = require('./controllers/seachController');
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.get('/search', searchController.index);
module.exports = routes;