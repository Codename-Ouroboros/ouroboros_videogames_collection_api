const path = require('path');
const fs = require('fs');
const Game = require('../models/gameModel');
const authMiddleware = require('../middlewares/authMiddleware');

async function getGames(req, res){
    // returns a list of games

    const user = await authMiddleware.getUser(req, res);
    
    try{
        const games = await Game.find({user_id: user.id}).sort({title: 1});

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
    const user = await authMiddleware.getUser(req, res);

    try{
        const game = await Game.findById(gameId);

        if(!game){
            res.status(400).send({msg: "the game does not exist"});
        }else if(game.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            res.status(200).send(game);
        }
    }catch(error){
        res.status(500).send(error);
    }
 
}

async function postGame(req, res){
    // create a new game

    const user = await authMiddleware.getUser(req, res);

    const game = new Game();
    const params = req.body;

    // body data:
    game.title = params.title;
    game.region = params.region;
    game.text_logo = params.text_logo;
    game.developer = params.developer;
    game.producer = params.producer;
    game.players = params.players;
    game.plot = params.plot;
    game.system = params.system;
    game.status = params.status;
    game.genre = params.genre;
    game.release_date = params.release_date;
    game.ean = params.ean;
    game.serial = params.serial;
    game.user_id = user.id;

    if(req.files.cover){
        const filePath = req.files.cover.path;
        let fileSplit = path.resolve(filePath).split(path.sep);

        let filename = fileSplit[fileSplit.length-1];

        let fileExt = filename.split(".");
        if(fileExt[fileExt.length-1] !== "jpg" && fileExt[fileExt.length-1] !== "jpeg" && fileExt[fileExt.length-1] !== "png"){
            // res.status(400).send({msg: "Incorrect extension. Only use .jpg, .jpeg or .png"});
            console.log('incorrect extension');
        }else{
            game.cover = filename;
        }
    }

    if(req.files.photos){
        let filenames = [];
        for(let i in req.files.photos){
            const filePath = req.files.photos[i].path;
            let fileSplit = path.resolve(filePath).split(path.sep);
    
            let filename = fileSplit[fileSplit.length-1];
    
            let fileExt = filename.split(".");
            if(fileExt[fileExt.length-1] !== "jpg" && fileExt[fileExt.length-1] !== "jpeg" && fileExt[fileExt.length-1] !== "png"){
                // res.status(400).send({msg: "Incorrect extension. Only use .jpg, .jpeg or .png"});
                console.log('incorrect extension');
            }else{
                filenames.push(filename);
            }
        }
        game.photos = filenames;
    }

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
    const user = await authMiddleware.getUser(req, res);

    try{
        Game.findById({_id: gameId}, (err, gameData) =>{
            let game = gameData;

            if(err){
                res.status(500).send({msg: "Server status error"});
            }else{
                if(!game){
                    res.status(400).send({msg: "the game does not exist"});
                }else if(game.user_id != user.id){
                    res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
                }else{
                    // body data:
                    game.title = params.title;
                    game.region = params.region;
                    game.text_logo = params.text_logo;
                    game.developer = params.developer;
                    game.producer = params.producer;
                    game.players = params.players;
                    game.plot = params.plot;
                    game.system = params.system;
                    game.status = params.status;
                    game.genre = params.genre;
                    game.release_date = params.release_date;
                    game.ean = params.ean;
                    game.serial = params.serial;

                    if(req.files.cover){
                        const filePath = req.files.cover.path;
                        let fileSplit = path.resolve(filePath).split(path.sep);
                
                        let filename = fileSplit[fileSplit.length-1];
                
                        let fileExt = filename.split(".");
                        if(fileExt[fileExt.length-1] !== "jpg" && fileExt[fileExt.length-1] !== "jpeg" && fileExt[fileExt.length-1] !== "png"){
                            // res.status(400).send({msg: "Incorrect extension. Only use .jpg, .jpeg or .png"});
                            console.log('incorrect extension');
                        }else{
                            game.cover = filename;
                        }
                    }
                
                    if(req.files.photos){
                        let filenames = [];
                        for(let i in req.files.photos){
                            const filePath = req.files.photos[i].path;
                            let fileSplit = path.resolve(filePath).split(path.sep);
                    
                            let filename = fileSplit[fileSplit.length-1];
                    
                            let fileExt = filename.split(".");
                            if(fileExt[fileExt.length-1] !== "jpg" && fileExt[fileExt.length-1] !== "jpeg" && fileExt[fileExt.length-1] !== "png"){
                                // res.status(400).send({msg: "Incorrect extension. Only use .jpg, .jpeg or .png"});
                                console.log('incorrect extension');
                            }else{
                                filenames.push(filename);
                            }
                        }
                        game.photos = filenames;
                    }
                    
                    Game.findByIdAndUpdate({_id: gameId}, game, (err, companyResult) => {
                        if(err){
                            res.status(404).send({msg: err});
                        }else{
                            res.status(201).send({msg: "the game has been update"});
                        }
                    });
                }
            }
        });
    }catch(error){
        res.status(500).send(error);
    }
}

async function deleteGame(req, res){
    // delete a game

    const gameId = req.params.id;
    const user = await authMiddleware.getUser(req, res);

    try{

        
        let game = await Game.findById(gameId);
        
        if(!game){
            res.status(400).send({msg: "the game does not exist"});
        }else if(game.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            game = await Game.findByIdAndDelete(gameId);
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