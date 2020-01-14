const dev = require('../models/dev');
const parseArrayAsString = require('../utils/parseStringAsArray');
module.exports={
    async index(request,response){
        const {latitude,longitude,techs} = request.query;
        const techsArray = parseArrayAsString(techs);
        const devs = await dev.find({
            techs: {
                $in: techsArray,
            },
            location:{
                $near:{
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude,latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });
        //filtro distancia
        //filtro techs
        return response.json({ devs });
    }
}