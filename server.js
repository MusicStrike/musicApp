'use strict';
require('dotenv').config();
const flash = require('express-flash');
var swiper = require('swiper');
const express = require('express');
const cors = require('cors');
const request = require('request');
let Music_API_KEY = process.env.Music_API_KEY;
const superagent = require('superagent');
const PORT = process.env.PORT || 5555;
const pg = require('pg');
const methodOverride = require('method-override');
let app = express();
var bodyparser = require('body-parser');
app.use(bodyparser.json());
var routes = require('./routes/routes.js');
app.use(routes);
var path = require('path');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(flash());

var session = require('express-session');


app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'woot',
  resave: false,
  saveUninitialized: false
}));



app.set('views/pages', path.join(__dirname, 'views/pages'));


app.get('/myplaylist', addtodatabase);
app.delete('/delete/:id', deletesong);






function deletesong(req, res) {
  let SQL = 'DELETE FROM songs WHERE id=$1;';
  let values = [req.params.id];

  return client.query(SQL, values)
    .then(res.redirect('/viewmylist'))

}



app.put('/update/:id_song', updatesong);
function updatesong(req, res) {
  // console.log("ZZZzzzz", req.body);
  let { title, preview_mp3, artist, album_cover_image, album_title } = req.body;
  let SQL = 'UPDATE songs SET title=$1, preview_mp3=$2, artist=$3, album_cover_image=$4, album_title=$5 WHERE id=$6 ;';
  let values = [title, preview_mp3, artist, album_cover_image, album_title, req.params.id_song];

  client.query(SQL, values)
    .then(() => {
      res.redirect(`/edit/${req.params.id_song}`)
    })

}
app.get('/viewmylist', getsongs);
function getsongs(req, res) {
  let SQL = 'SELECT * FROM Songs;';
  return client.query(SQL)
    .then(results => {

      res.render('pages/songs/show', { songs: results.rows });

    })

}
app.get('/edit/:music_id', specificSong)
function specificSong(req, res) {

  let SQL = 'SELECT * FROM Songs WHERE id=$1;';
  let values = [req.params.music_id];
  client.query(SQL, values)

    .then(musicResult => {
      res.render('pages/finalcopy', { amazingSong: musicResult.rows[0] })


    })


}

function addtodatabase(req, res) {
  let { title, preview_mp3, artistName, album_cover_image, album_title, } = req.query;

  let selectsql = 'select title from Songs where title=$1;'
  let valuess = [req.query.title];
  console.log(valuess);
  client.query(selectsql, valuess)
    .then((results) => {
      console.log("results : ", results);
      if (results.rowCount === 0) {
        let SQL = 'INSERT INTO Songs(title, preview_mp3, artist, album_title, album_cover_image) VALUES($1, $2, $3, $4, $5)';
        let values = [title, preview_mp3, artistName, album_title, album_cover_image];
        return client.query(SQL, values)
          .then(() => {
            req.flash('success', 'Song added to <a href="/viewmylist">playlist</a>');
            res.redirect('/');
          });
      } else {
        req.flash('success', 'Song NOT added to <a href="/viewmylist">playlist</a>');
        res.redirect('/')

      }
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



    // var obj = JSON.parse(body);
    //console.log("this isnt",obj)

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
// $(document).ready(function () {
swiper = new swiper ('.swiper-container', {
  // Optional parameters
  direction: 'vertical',
  loop: true
})




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

