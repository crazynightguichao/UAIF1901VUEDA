module.exports=function (app) {
   
    app.get('/api/message1', (req, res) => {
        res.json(require('./static/database.json'))
    })
    app.get('/api/Collaruse', (req, res) => {
        res.json(require('./static/Collaruse.json'))
    })

}