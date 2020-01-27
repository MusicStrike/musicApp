'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const request = require('request');
let Music_API_KEY = process.env.Music_API_KEY;
const superagent = require('superagent');
const PORT = process.env.PORT || 8080;
const pg = require('pg')
let app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.get('/test', (req,res) =>{

var options = {
  method: 'GET',
  url: `https://deezerdevs-deezer.p.rapidapi.com/search?q=${req.query.input}`,
  qs: {q: req.query.input },
  
  headers: {
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
    'x-rapidapi-key': Music_API_KEY
  }
}

request(options, function (error, response, body) {

    if (error) throw new Error(error)

    
    let jSonData = JSON.parse(body)
    let song = jSonData.data.map(singer => new Music(singer))
    
    res.render('pages/new' , {list:song}); 
});

  
function Music(singer){
    this.title=singer.title
    this.preview_mp3=singer.preview
    this.artistName=singer.artist.name
    this.album_cover_image=singer.album.cover_medium
    this.album_title=singer.album.title
} 
});

//=============top chart============

//=============================
// var express = require('express');
var bodyparser = require('body-parser');
var routes = require('./routes/routes.js');
var path = require('path');

// var app=express();

app.set('views/pages',path.join(__dirname,'views/pages'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

app.use(bodyparser.json());
app.use(routes);


app.get('/', (req, res) => {
    var options = {
      method: 'GET',
      url: 'https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi',
      qs: {chartsweek: '1'},
      headers: {
        'x-rapidapi-host': '30-000-radio-stations-and-music-charts.p.rapidapi.com',
        'x-rapidapi-key': 'eecd5fae1amsh533358a9cbb816dp1e354cjsn4ffd1b1a115c'
      }
    };
    
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
    
      
     
      var obj = JSON.parse(body);
      console.log("this isnt",obj)


      let topSong = obj.results.map(song => new TopChart(song))
      res.render('pages/index' , {topSong:topSong});
    //   obj.results.forEach(function(item){
    //     console.log('123',item.artist_song,"song", item.title_song)
    //     res.render(item.artist_song,"song", item.title_song)
      })
      function TopChart(song){
          console.log("this is in constructor",song.artist_song)
        this.artist_song=song.artist_song
        this.title_song=song.title_song
      
    } 
    
    });

// })





























app.get('/', (req,res) => {
  
     res.render('pages/index');
 })

app.get('*', (req, res) => {

    res.status(404).render('./pages/error', { erorr: '404 NOT FOUND' })
});
const client = new pg.Client(process.env.DATABASE_URL);
client.connect(console.log('im DB'))
.then( () => {
app.listen(PORT, () => {
    console.log(`Host : ${PORT}` )
})
})