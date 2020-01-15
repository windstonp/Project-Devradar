const {Router} = require("express");
const routes = Router();
const DevController = require("./controllers/DevController");
const searchController = require('./controllers/seachController');

routes.delete('/devs',DevController.destroy);
routes.put('/devs/:github_username', DevController.update);
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.get('/search', searchController.index);
module.exports = routes;