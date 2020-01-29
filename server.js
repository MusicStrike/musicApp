/* eslint-disable camelcase */
'use strict';
require('dotenv').config();
const flash = require('express-flash');

const express = require('express');
const cors = require('cors');
const request = require('request');
let Music_API_KEY = process.env.Music_API_KEY;
const superagent = require('superagent');
const PORT = process.env.PORT || 5500;
const pg = require('pg');
let app = express();
var bodyparser = require('body-parser');
app.use(bodyparser.json());
var routes = require('./routes/routes.js');
app.use(routes);
var path = require('path');
// var app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true, }));
app.use(express.static('public'));
app.use(flash());
///=========================
var session = require('express-session');

//...


app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));
                  
//====================

app.set('views/pages', path.join(__dirname, 'views/pages'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.get('/myplaylist', addtodatabase);
// app.get('/songs/show/:id', getsong);//when we want to view details
app.get('/viewmylist', getsongs);
app.get('/delete/:id', deletesong);
app.get('/update/:id', updatesong);


function deletesong(req, res) {
  let SQL = 'DELETE FROM songs WHERE id=$1;';
  let values = [req.params.id];

  return client.query(SQL, values)
    .then(res.redirect('/viewmylist'))
    .catch(err => handleError(err, res));
}

function updatesong(req, res) {
  console.log(req.body);
  let { title, preview_mp3, artistName, album_cover_image, album_title, } = req.body;
  let SQL = 'UPDATE songs SET title=$1, preview_mp3=$2, artistName=$3, album_cover_image=$4, album_title=$5, WHERE id=$6;';
  let values = [title, preview_mp3, artistName, album_cover_image, album_title, req.params.id];

  client.query(SQL, values)
    .then(()=>{
      req.flash('success', 'Song added to <a href="/viewmylist">playlist</a>')
      res.redirect('/viewmylist')})
    .catch(err => handleError(err, res));
}

function getsongs(req, res) {
  let SQL = 'SELECT * FROM Songs;';
  client.query(SQL)
    .then(results => {

      res.render('pages/songs/show', { songs: results.rows, });

    })
    .catch(err => handleError(err, res));
}


function addtodatabase(req, res) {
  let { title, preview_mp3, artistName, album_cover_image, album_title, } = req.query;
  let SQL = 'INSERT INTO Songs(title, preview_mp3, artist, album_title, album_cover_image) VALUES($1, $2, $3, $4, $5);';
  let values = [title, preview_mp3, artistName, album_title, album_cover_image];
  client.query(SQL, values)
    .then(() => {
      req.flash('success', 'Song added to <a href="/viewmylist">playlist</a>');
      res.redirect('/');
    });
}

app.get('/', (req, res) => {
  var options = {
    method: 'GET',
    url: 'https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi',
    qs: { chartsweek: '1' },
    headers: {
      'x-rapidapi-host': '30-000-radio-stations-and-music-charts.p.rapidapi.com',
      'x-rapidapi-key': 'eecd5fae1amsh533358a9cbb816dp1e354cjsn4ffd1b1a115c'
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);



    var obj = JSON.parse(body);
    // console.log("this isnt",obj)

    let topSong = obj.results.map(song => new TopChart(song))
    res.render('pages/index', { topSong: topSong });

  })
  function TopChart(song) {
    // console.log("this is in constructor",song.artist_song)
    this.artist_song = song.artist_song
    this.title_song = song.title_song

  }

});
//======================================







































app.get('/', (req, res) => {
  // console.log(req);
  res.render('pages/index');
})
app.get('*', (req, res) => {
  // console.log('this is for checking ', req);
  res.status(404).render('./pages/error', { erorr: '404 NOT FOUND' })
});
const client = new pg.Client(process.env.DATABASE_URL);
client.connect(console.log('im DB'))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Host : ${PORT}`)
    })
  })


