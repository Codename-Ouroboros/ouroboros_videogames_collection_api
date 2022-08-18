
const Game = require('../models/gameModel');

async function getGames(req, res){
    // returns a list of games
    
    try{
        const games = await Game.find().sort({title: 1});

        if(games.length === 0){
            res.status(400).send({msg: "there are no games"});
        }else{
            res.status(200).send(games);
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function getGame(req, res){
    // returns a game

    const gameId = req.params.id;

    try{
        const game = await Game.findById(gameId);

        if(!game){
            res.status(400).send({msg: "the game does not exist"});
        }else{
            res.status(200).send(game);
        }
    }catch(error){
        res.status(500).send(error);
    }
 
}

async function postGame(req, res){
    // create a new game

    const game = new Game();
    const params = req.body;

    // body data:
    game.title = params.title;
    game.region = params.region;
    game.cover = params.cover;
    game.image = params.image;
    game.text_logo = params.text_logo;
    game.developer = params.developer;
    game.producer = params.producer;
    game.players = params.players;
    game.plot = params.plot;
    game.system = params.system;
    game.status = params.status;
    game.genre = params.genre;
    game.photos = params.photos;
    game.release_date = params.release_date;
    game.ean = params.ean;
    game.serial = params.serial;

    try{
        const gameStore = await game.save();

        if(!gameStore){
            res.status(400).send({msg: "error when saving the game"});
        }else{
            res.status(201).send({game: gameStore});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function putGame(req, res){
    // Update a game

    const gameId = req.params.id;
    const params = req.body;

    try{
        const game = await Game.findByIdAndUpdate(gameId, params);

        if(!game){
            res.status(400).send({msg: "the game does not exist"});
        }else{
            res.status(201).send({msg: "the game has been update"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function deleteGame(req, res){
    // delete a game

    const gameId = req.params.id;

    try{
        const game = await Game.findByIdAndDelete(gameId);

        if(!game){
            res.status(400).send({msg: "the game does not exist"});
        }else{
            res.status(200).send({msg: "the game has been delete"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

module.exports = {
    getGames,
    getGame,
    postGame,
    putGame,
    deleteGame
}