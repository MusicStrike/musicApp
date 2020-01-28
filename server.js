/* eslint-disable camelcase */
'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const request = require('request');
let Music_API_KEY = process.env.Music_API_KEY;
const superagent = require('superagent');
const PORT = process.env.PORT || 7788;
const pg = require('pg');
const methodOverride = require('method-override');
let app = express();


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.get('/myplaylist', addtodatabase);
// app.get('/songs/show/:id', getsong);//when we want to view details
app.delete('/delete/:id', deletesong);
//app.get('/update/:id', updatesong);





function deletesong(req, res) {
  let SQL = 'DELETE FROM songs WHERE id=$1;';
  let values = [req.params.id];

  return client.query(SQL, values)
    .then(res.redirect('/viewmylist'))
  // .catch(err => handleError(err, res));
}
// function updateValues( req , res )


app.put('/update/:id_song', updatesong);
function updatesong(req, res) {
  console.log("ZZZzzzz", req.body);
  let { title, preview_mp3, artist, album_cover_image, album_title } = req.body;
  let SQL = 'UPDATE songs SET title=$1, preview_mp3=$2, artist=$3, album_cover_image=$4, album_title=$5 WHERE id=$6 ;';
  let values = [title, preview_mp3, artist, album_cover_image, album_title, req.params.id_song];

  client.query(SQL, values)
    .then(() => {
      res.redirect(`/edit/${req.params.id_song}`)
    })
  /*app.get('/details/:music_id' , oneSong);
  function oneSong ( req , res ) {
  
    console.log('detail function');
    let SQL = 'SELECT * FROM Songs WHERE id=$1;' ;
    let values = [req.params.music_id] ;
    return client.query(SQL , values)
      .then((tableIdData) => {
      // console.log(tableIdData.rows[0]);
        return res.render('songs/showing' , { theChoosenOne : tableIdData.rows[0]})
      })
  
  }*/

  // .catch(err => handleError(err, res))

  // .then( res.redirect('/viewmylist'))
  // .catch(err => handleError(err, res));
}
app.get('/viewmylist', getsongs);
function getsongs(req, res) {
  let SQL = 'SELECT * FROM Songs;';
  return client.query(SQL)
    .then(results => {
      //   if (results.rows.rowCount === 0) {
      //     res.render('pages/error');
      //   } else {
      res.render('pages/songs/show', { songs: results.rows });
      //   }
    })
  // .catch(err => handleError(err, res));
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
  /**************/
  let selectsql = 'select title from songs where title=$1;'
  let valuess = [req.params.title];
  client.query(selectsql, valuess)
    .then((results) => {
      console.log(results);
      if (results.rowCount !== 0) {
        let SQL = 'INSERT INTO Songs(title, preview_mp3, artist, album_title, album_cover_image) VALUES($1, $2, $3, $4, $5)';
        let values = [title, preview_mp3, artistName, album_title, album_cover_image];
        client.query(SQL, values)
          .then(() => {
            res.render('pages/thanks', {});
          });
      }else {
        res.redirect('/')
      }
    });

  /**************/
  // let SQL = 'INSERT INTO Songs(title, preview_mp3, artist, album_title, album_cover_image) VALUES($1, $2, $3, $4, $5)';
  // let values = [title, preview_mp3, artistName, album_title, album_cover_image];
  // client.query(SQL, values)
  //   .then(() => {
  //     res.render('pages/thanks' , {});
  //   });
}

// function checking(req,res){
// let SQL = 'SELECT * from songs;'
// if()

// }

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
    //console.log("this isnt",obj)


    let topSong = obj.results.map(song => new TopChart(song))
    res.render('pages/index', { topSong: topSong });

  })
  function TopChart(song) {
    // console.log("this is in constructor",song.artist_song)
    this.artist_song = song.artist_song
    this.title_song = song.title_song

  }

});
// 'use strict';
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const request = require('request');
// let Music_API_KEY = process.env.Music_API_KEY;
// const superagent = require('superagent');
// const PORT = process.env.PORT || 5000;
// const pg = require('pg')
// let app = express();
// app.use(express.static('public'))
//app.use('/static', express.static('public'))
// app.set('view engine', 'ejs');
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'))
//ch2----
// app.get('/test', (req,res) =>{
// var request = require("request");
// let reqJson = req.body
// res.render('music/show')
// var options = {
//   method: 'GET',
//   url: `https://deezerdevs-deezer.p.rapidapi.com/search?q=${req.query.input}`,
//   qs: {q: req.query.input },

//   headers: {
//     'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
//     'x-rapidapi-key': Music_API_KEY
//   }
// }
// // superagent(options.url)
// // .then(musicData =>{
// //     let jSonData =musicData.body.data
// //     console.log(jSonData)
// //     console.log('hi');
// // })
// request(options, function (error, response, body) {
//    // console.log(options.qs.q)
//     if (error) throw new Error(error)
//  // superagent.get(options.url)
//  //let jSonData =body.data
//     //console.log(jSonData)


//     let jSonData = JSON.parse(body)
//     let song = jSonData.data.map(singer => new Music(singer))
// res.redirect('/')
// ch1-----
// res.render('pages/new' , {list:song}); 
// });
// for(let i=0 ;i<jSonData.data.length; i++){

//     res.send(jSonData.data[i].title)
// }
// let rendered = jSonData.data.forEach(song => {
//     let formatted = new Music(song)
//     console.log(formatted)
// })
// let hello = jSonData.forEach(song => {
//     let formatted = new Music(song)
//     console.log(formatted)
// })
//      res.render(`music/show` , hello)

// function Music(singer){
//     this.title=singer.title
//     this.preview_mp3=singer.preview
//     this.artistName=singer.artist.name
//     this.album_cover_image=singer.album.cover_medium
//     this.album_title=singer.album.title
// } 
// })
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

