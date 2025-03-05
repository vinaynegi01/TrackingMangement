const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const PORT = 4000
const app = express();
const db = require('./dbconfig/db.config');
const bodyparser = require('body-parser');
const path = require('path');
const routes = require('./routes/userRoutes');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
app.use(morgan('dev'));


app.use(cors());
app.use(bodyparser.json());
db.sequelize.sync({
    alter:true
});

app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views')); // Make sure to require('path') at the top of your script

app.use('/api', routes);
app.use(express.static(__dirname + '/public'))


app.listen(PORT, () => {
    console.log(`Listing to server at ${PORT}`);
});
