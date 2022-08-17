const app = require('./app');
const port = 3000;
const host = "http://localhost"

app.listen(port, () =>{
    console.log(`Server works in: ${host}:${port}`);
});