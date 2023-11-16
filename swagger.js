const swaggerAutogen = require('swagger-autogen')();

const doc={
    info:{
        title:'Dungeon Keeper',
        description:'A database that organizes spells for Advanced Dungeons and Dragons Second Edition. Users can view spells, create characters and organize spellbooks based on their character.',
    },
    host:'localhost:3000',//we need a link to the render for whoever's account is setting this up
    schemes:['http','https']
};

const outputFile= './swagger.json';
const endpointFile = ['./routes/index.js' ];

swaggerAutogen(outputFile, endpointFile, doc)