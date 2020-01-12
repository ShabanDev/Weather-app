let express = require('express');

let app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile('/dist/index.html');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});