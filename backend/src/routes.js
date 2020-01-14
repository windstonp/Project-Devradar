const {Router} = require("express");
const routes = Router();
const dev = require('./models/dev');
const axios = require("axios");

routes.post('/devs',async (request,response)=>{
    const { github_username, techs, latitude, longitude}=request.body;
    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    const { name = login , avatar_url, bio} = apiResponse.data;
    const techsArray = techs.split(',').map(tech=>tech.trim());
    const location = {
        type: 'Point',
        coordinates: [longitude,latitude]
    }
    const devs = await dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
    });
    return response.json(devs);
});
module.exports = routes;