const express = require('express');
const path = require('path');

//##########################        MIDDLEWARE

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));

//##########################        ROUTES

app.get('/', (req, res) => {
   res.render('index')
})
app.get('/about', (req, res) => {
   res.render('about')
})


app.listen(3000, () => {
   console.log('APP IS LISTENING ON PORT 3000')
});