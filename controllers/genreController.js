
const Genre = require('../models/genreModel');
const authMiddleware = require('../middlewares/authMiddleware');

async function getGenres(req, res){
    // returns a list of videogames genre

    const user = await authMiddleware.getUser(req, res);
    
    try{
        const genres = await Genre.find({user_id: user.id}).sort({name: 1});

        if(genres.length === 0){
            res.status(400).send({msg: "there are no genres"});
        }else{
            res.status(200).send(genres);
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function getGenre(req, res){
    // returns a genre

    const genreId = req.params.id;
    const user = await authMiddleware.getUser(req, res);
    

    try{
        const genre = await Genre.findById(genreId);

        if(!genre){
            res.status(400).send({msg: "the genre does not exist"});
        }else if(genre.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            res.status(200).send(genre);
        }
    }catch(error){
        res.status(500).send(error);
    }
 
}

async function postGenre(req, res){
    // create a new genre

    const user = await authMiddleware.getUser(req, res);

    const genre = new Genre();
    const params = req.body;

    // body data:
    genre.name = params.name;
    genre.user_id = user.id;

    try{
        const genreStore = await genre.save();

        if(!genreStore){
            res.status(400).send({msg: "error when saving the genre"});
        }else{
            res.status(201).send({genre: genreStore});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function putGenre(req, res){
    // Update a genre

    const genreId = req.params.id;
    const params = req.body;
    const user = await authMiddleware.getUser(req, res);

    try{
        let genre = await Genre.findById(genreId);

        if(!genre){
            res.status(400).send({msg: "the genre does not exist"});
        }else if(genre.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            genre = await Genre.findByIdAndUpdate(genreId, params);
            res.status(201).send({msg: "the genre has been update"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function deleteGenre(req, res){
    // delete a genre

    const genreId = req.params.id;
    const user = await authMiddleware.getUser(req, res);

    try{
        let genre = await Genre.findById(genreId);

        if(!genre){
            res.status(400).send({msg: "the genre does not exist"});
        }else if(genre.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            genre = await Genre.findByIdAndDelete(genreId);
            res.status(200).send({msg: "the genre has been delete"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

module.exports = {
    getGenres,
    getGenre,
    postGenre,
    putGenre,
    deleteGenre
}