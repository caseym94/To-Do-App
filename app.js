let express = require('express'),
    app = express();
    
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

//Routes
app.get('/', function (req, res) {
    res.render('index');
});

app.listen(3000);
console.log('listening on port 3000');