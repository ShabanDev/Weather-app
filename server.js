let express = require('express');
let dotenv  = require('dotenv-safe');
let routes  = require('./routes');

dotenv.config();

let app = express();

app.use('/', routes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});