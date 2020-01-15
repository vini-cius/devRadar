const Dev = require('../models/Dev.js');
const parseStringAsArray = require('../utils/parseStringAsArray.js');

module.exports = {
  async index(req, res){
    //Buscar todos devs num raio de 10km
    //filtrar por tecnologias

    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      }
    });

    return res.json({ devs });
  },
};