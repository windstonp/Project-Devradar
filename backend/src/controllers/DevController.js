const dev = require('../models/dev');
const axios = require("axios");
module.exports = {
    async index(request,response){
        const devs = await dev.find();
        return response.json(devs);
    },
    async store(request,response){
        const { github_username, techs, latitude, longitude}=request.body;
        let devs = await dev.findOne({github_username});
        if(!devs){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login , avatar_url, bio} = apiResponse.data;
            const techsArray = techs.split(',').map(tech=>tech.trim());
            const location = {
                type: 'Point',
                coordinates: [longitude,latitude]
            };
            devs = await dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
        return response.json(devs);
    }
};