const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//advanced templates
hbs.registerPartials(__dirname + '/views/partials');
//template engine
app.set('view engine', 'hbs');


//middleware registration (order is importaint!)
app.use(express.static(__dirname + '/public'));
//another 
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//         welcomeText: 'Under maintenance!'
//     });
// });

//function for templates
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/',(req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Anon',
    //     likes: [
    //         'biking',
    //         'hiking'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeText: 'You are welcome!'
    });
});

app.get('/about',(req, res) => {
    //res.send('About page.');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad',(req, res) => {
    res.send({
        code: 500,
        message: 'sample error'
    });
});


app.listen(3000, () => {
    console.log('server is up on port 3000');
});