const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

process.env.DATABASE="mongodb+srv://mkniazi:<PASSWORD>@cluster0.dn3vzax.mongodb.net/?retryWrites=true&w=majority"
process.env.DBPASS="oJtuoql4qwzbRmcC";
process.env.NODE_ENV="production";
// process.env.PORT=4000;





// const { tour } = require('./routes/tourRoute');
dotenv.config({ path: `./config.env` });

//  using mongoose labriry to set mongoDb
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DBPASS)
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('Mongodb is integrated with express()'))
    .catch(err => {
        if (process.env.NODE_ENV === 'development') console.log(err);
        console.log('Mongodb isnt\' integrated with express()');

    })

const port = process.env.PORT || 4000;
app.listen(port, () => { console.log(`app just listing at port ${port}`) });