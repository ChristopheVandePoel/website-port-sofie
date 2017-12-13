let express = require('express');
var path = require('path');
const app = express();

app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static('.'));

app.listen(8001 ,() => {
    console.log(`listening on 8001...`);
});