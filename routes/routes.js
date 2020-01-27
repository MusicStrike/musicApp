const express = require('express');
const router = express.Router();

const rp = require('request-promise');
const cheerio = require('cheerio');

router.get('/lyrics',function(req, res){
  res.render('pages/index');
});

router.get('/getmusic/:query',function(req,res){
  console.log(req.params.query);

  let query=(req.params.query).toString().trim().replace(/ /g,"+");
  

  let url1=`https://search.azlyrics.com/search.php?q=${query}`

  console.log(url1)

  rp(url1)
    .then((html)=>{
    
      let $ = cheerio.load(html);
      let panels = $('.panel');
      let url2 = '';
     
      panels.each((i,panel)=>{
     
        let ph = $(panel).find('.panel-heading b').text();
        if(ph=='Song results:'){
         
          let links = $(panel).find('.text-left>a');
          // console.log($('.text-left>a', html));
          url2 = $($(links)[0]).attr('href');
          return;
        }
      });
  console.log('hellooooo',url2)
      return url2;
      
    })
    .then((url)=>{
      console.log(url)
      
      rp(url)
      .then((html)=>{
      
        let $ = cheerio.load(html);
        let lyrics = $('.ringtone').nextAll().text();
        
        res.send(lyrics);
      })
      .catch((err)=>{
       
        res.send('Lyrics Not Found');
      });
    })
    .catch((err)=>{
      
      res.send('Lyrics Not Found');
    })


});

module.exports = router;