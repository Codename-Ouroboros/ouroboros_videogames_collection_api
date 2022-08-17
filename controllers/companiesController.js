
function getCompanies(req, res){
    // returns a list of companies that distribute, manufacture and develop video games
    res.status(200).send({msg: "Mensaje de prueba"});

}

module.exports = {
    getCompanies
}