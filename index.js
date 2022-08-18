const { default: mongoose } = require('mongoose');
const app = require('./app');
const port = 3000;
const host = "http://localhost"

mongoose.connect("mongodb://localhost:27017/game_collector", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    try{
        if(err){
            throw err;
        }else{
            console.log("Successful database connection")
        }
    }catch(error){
        console.error(error);
    }
});

app.listen(port, () =>{
    console.log(`Server works in: ${host}:${port}`);
});