const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

const config = require('./server/config/database');

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
     console.log(`Connected to datebase ${config.database}`);
});
mongoose.connection.on('error', (err) => {
     console.log(`Datebase error ${err}`);
});

const app = express();



const users = require('./server/routes/users');
const apiRoutes = require('./server/routes/api.routes');

const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./server/config/passport')(passport);

app.use('/users', users);
app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', `index.html`));
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});