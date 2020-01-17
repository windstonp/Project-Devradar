const dev = require('../models/dev');
const axios = require("axios");
const parseArrayAsString = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../WebSocket');
module.exports = {
    async update(request, response) {
        try{
            const {github_username: github_param } = request.params;
            const {github_username: github_body } = request.body;
            if(github_body){
                throw new Error('github não poderá ser alterado');
            }
            const update = await dev.updateOne({github_username: github_param}, request.body);
            if(update.nModified == 0){
                
                throw new Error("dev não encontrado");
            }
            return response.send();
        }catch(err){
            return response.status(400).send({error: `${err}`});
        }
    },
    async destroy(request,response){
        const {id} = request.query;
        dev.findByIdAndDelete({_id: id}).exec();
        return response.json(`usuario com a id ${id} acabou de ser excluido`);
    },
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
            const techsArray = parseArrayAsString(techs);
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
            //filtrar conexões que estão a 10 km de distancia 
            //e que o novo dev possua uma tecnologia filtrada
            const sendSocketMessageTo = findConnections(
                {latitude,longitude},
                techsArray
            )
            sendMessage(sendSocketMessageTo, 'new-dev',devs);
        }
        return response.json(devs);
    },
};