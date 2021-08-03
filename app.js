const axios = require('axios').default,
      jsdom = require('jsdom'),
      { JSDOM }=  jsdom;
var express = require('express');
var fs = require('fs');
const stripHtml = require("string-strip-html");
var app = express();
var stringSimilarity = require("string-similarity");
var tcom = require('thesaurus-com');
//express.urlencoded({ extended: true })
app.use(express.urlencoded());
app.set('view engine','ejs');
const fetch = require("node-fetch");
const { log } = require('console');
const got = require('got');
const cheerio = require('cheerio');

app.listen(3000);
let string1 =""; let string2 = "";
let sURL0 =""; 
let sURL1 =""; let sURL11 =""; let sURL12 =""; let sURL13 ="";
let sURL2 =""; let sURL21 =""; let sURL22 =""; let sURL23 ="";
let sURL3 =""; let sURL31 =""; let sURL32 =""; let sURL33 ="";
let sURL4 =""; let sURL41 =""; let sURL42 =""; let sURL43 ="";
let sURL5 =""; let sURL51 =""; let sURL52 =""; let sURL53 ="";
var benzerlikler = [];
var benzerlikler2 = [];

app.get('/',(req,res) =>{
  res.render('asama1',{sortable:0});
});
app.get('/contact',(req,res) =>{
    res.render('asama1',{sortable:0});
  });

app.post('/contact', function(req,res) {
    console.log(req.body.url1);
    JSDOM.fromURL(req.body.url1).then(dom => {
      if(string2 != ""){
        string2 = "";
      }
    string1 =  stripHtml(dom.window.document.getElementsByTagName('body')[0].innerHTML);
    let sonuc = dosyaOku(string1);  
    res.render('asama1',{sortable:sonuc});
});
});
app.get('/',(req,res) =>{
    res.render('asama2-3',{sortable:0});
    });
app.get('/asama2-3',(req,res) =>{
    res.render('asama2-3',{sortable:0});
    });
app.post('/contact2', function(req,res) {
    console.log(req.body.url2);
    JSDOM.fromURL(req.body.url2).then(dom => {
      string2 =  stripHtml(dom.window.document.getElementsByTagName('body')[0].innerHTML);
      let sonuc2 = dosyaOku(string2);
      res.render('asama2-3',{sortable:sonuc2});
    });
  });

function dosyaOku(readedData){
      const re = " ";
      // /\W/ kelime olmayan karakter
      let array = readedData.split(/\s+/);
      return  frekansBul(array);
}


function frekansBul(array) {
let kelimeListesi = {};

array.forEach(element => {
    if(kelimeListesi.hasOwnProperty(element.toString())){
        kelimeListesi[element.toString()] +=1;
    }
    else {
        kelimeListesi[element.toString()] =1;
    }

});
var sortable = [];
var baglac=["ama","ancak","bir","olarak","belki","bile","çünkü","da","de","demek","dışında","eğer","fakat","gibi","hatta",
"halbuki","ile","ki","karşın","lakin","madem","mademki","meğerki","meğerse","neyse","oysa","oysaki","ve","velakin","velev",
"veya","veyahut","velhasıl","yahut","yoksa","yani","zira","ya","ya da","after","as","whenever","when","the","to","and","or",
"until","since","now","that","which","wherever","who","before","if","even if","though","so","yet","but","if only"];
for(var key in kelimeListesi){
  for (let i = 0; i < baglac.length; i++) {
    if(key.toString()===baglac[i]){
      key++;
    }else{
      continue;
    }
  }
      sortable.push([key.toString(), kelimeListesi[key]]);
}

sortable.sort(function(a, b) {
    return a[1] - b[1];
});

return sortable;
}

app.get("/asama2-3-2",(req,res)=>{
    res.write('<html>');
    res.write('<body>');
    res.write('<h1>Benzerlik Oran</h1>');
      res.write('<p>'); 
      res.write(stringSimilarity.compareTwoStrings(string1, string2).toString());
      res.write('</p>');  
      res.write('</body>');
    res.write('</html>');
    res.end();
  
});

app.get('/',(req,res) =>{
  res.render('asama4');
});
app.get('/asama4',(req,res) =>{
    res.render('asama4');
  });

 
app.post('/contact3',async function(req,res) {
  var dom0 = await JSDOM.fromURL(req.body.yURL0)
  console.log("Tek link -------> "+req.body.yURL0);
  sURL0 =  stripHtml(dom0.window.document.getElementsByTagName('body')[0].innerHTML);
 
 
  var dom1 = await JSDOM.fromURL(req.body.yURL1)
  console.log("1. link -------> "+req.body.yURL1);
  sURL1 =  stripHtml(dom1.window.document.getElementsByTagName('body')[0].innerHTML);
  var x1 = dom1.window.document.links[3].href;
  var x2 = dom1.window.document.links[5].href;
  var x3 = dom1.window.document.links[7].href;
  benzerlikler[0]=stringSimilarity.compareTwoStrings(sURL0, sURL1).toString();
  console.log("0-1 --> "+benzerlikler[0]);
      var dom11 = await JSDOM.fromURL(x1)
      console.log("1.1 link -------> "+x1);
      sURL11 = stripHtml(dom11.window.document.getElementsByTagName('body')[0].innerHTML);
      benzerlikler[1]=stringSimilarity.compareTwoStrings(sURL0, sURL11).toString();
      console.log("0-1.1 --> "+benzerlikler[1]);
        
      var dom12 = await JSDOM.fromURL(x2)
      console.log("1.2 link -------> "+x2);
      sURL12 = stripHtml(dom12.window.document.getElementsByTagName('body')[0].innerHTML);
      benzerlikler[2]=stringSimilarity.compareTwoStrings(sURL0, sURL12).toString();
      console.log("0-1.2 --> "+benzerlikler[2]);

      var dom13 = await JSDOM.fromURL(x3)
      console.log("1.3 link -------> "+x3);
      sURL13 = stripHtml(dom13.window.document.getElementsByTagName('body')[0].innerHTML);
      benzerlikler[3]=stringSimilarity.compareTwoStrings(sURL0, sURL13).toString();
      console.log("0-1.3 --> "+benzerlikler[3]);
 
  var dom2 = await JSDOM.fromURL(req.body.yURL2)
  console.log("2. link -------> "+req.body.yURL2);
  sURL2 =  stripHtml(dom2.window.document.getElementsByTagName('body')[0].innerHTML);
  var x1 = dom2.window.document.links[3].href;
  var x2 = dom2.window.document.links[4].href;
  var x3 = dom2.window.document.links[5].href;
  benzerlikler[4]=stringSimilarity.compareTwoStrings(sURL0, sURL2).toString();
  console.log("0-2 --> "+benzerlikler[4]);

    var dom21 = await JSDOM.fromURL(x1)
      console.log("2.1 link -------> "+x1);
      sURL21 = stripHtml(dom21.window.document.getElementsByTagName('body')[0].innerHTML);
      benzerlikler[5]=stringSimilarity.compareTwoStrings(sURL0, sURL21).toString();
      console.log("0-2.1 --> "+benzerlikler[5]);
    
    var dom22 = await JSDOM.fromURL(x2)
      console.log("2.2 link -------> "+x2);
      sURL22 = stripHtml(dom22.window.document.getElementsByTagName('body')[0].innerHTML);
      benzerlikler[6]=stringSimilarity.compareTwoStrings(sURL0, sURL22).toString();
      console.log("0-2.2 --> "+benzerlikler[6]);
    
    var dom23 = await JSDOM.fromURL(x3)
      console.log("2.3 link -------> "+x3);
      sURL23 = stripHtml(dom23.window.document.getElementsByTagName('body')[0].innerHTML);
      benzerlikler[7]=stringSimilarity.compareTwoStrings(sURL0, sURL23).toString();
      console.log("0-2.3 --> "+benzerlikler[7]);
        
  var dom3 = await JSDOM.fromURL(req.body.yURL3)
  console.log("3. link -------> "+req.body.yURL3);
  sURL3 =  stripHtml(dom3.window.document.getElementsByTagName('body')[0].innerHTML);
  var x1 = dom3.window.document.links[3].href;
  var x2 = dom3.window.document.links[4].href;
  var x3 = dom3.window.document.links[5].href;
  benzerlikler[8]=stringSimilarity.compareTwoStrings(sURL0, sURL3).toString();
  console.log("0-3 --> "+benzerlikler[8]);

      var dom31 = await JSDOM.fromURL(x1)
      console.log("3.1 link -------> "+x1);
      sURL31 = stripHtml(dom31.window.document.getElementsByTagName('body')[0].innerHTML);
      benzerlikler[9]=stringSimilarity.compareTwoStrings(sURL0, sURL31).toString();
      console.log("0-3.1 --> "+benzerlikler[9]);
  
      var dom32 = await JSDOM.fromURL(x2)
      console.log("3.2 link -------> "+x2);
      sURL32 = stripHtml(dom32.window.document.getElementsByTagName('body')[0].innerHTML);
      benzerlikler[10]=stringSimilarity.compareTwoStrings(sURL0, sURL32).toString();
      console.log("0-3.2 --> "+benzerlikler[10]);
    
      var dom33 = await JSDOM.fromURL(x3)
      console.log("3.3 link -------> "+x3);
      sURL33 = stripHtml(dom33.window.document.getElementsByTagName('body')[0].innerHTML);
      benzerlikler[11]=stringSimilarity.compareTwoStrings(sURL0, sURL33).toString();
      console.log("0-3.3 --> "+benzerlikler[11]);
          
  var dom4 = await JSDOM.fromURL(req.body.yURL4)
  console.log("4. link -------> "+req.body.yURL4);
  sURL4 =  stripHtml(dom4.window.document.getElementsByTagName('body')[0].innerHTML);
  var x1 = dom4.window.document.links[3].href;
  var x2 = dom4.window.document.links[4].href;
  var x3 = dom4.window.document.links[5].href;
  benzerlikler[12]=stringSimilarity.compareTwoStrings(sURL0, sURL4).toString();
  console.log("0-4 --> "+benzerlikler[12]);

    var dom41 = await JSDOM.fromURL(x1)
      console.log("4.1 link -------> "+x1);
      sURL31 = stripHtml(dom41.window.document.getElementsByTagName('body')[0].innerHTML);
      benzerlikler[13]=stringSimilarity.compareTwoStrings(sURL0, sURL41).toString();
      console.log("0-4.1 --> "+benzerlikler[13]);
   
    var dom42 = await JSDOM.fromURL(x2)
      console.log("4.2 link -------> "+x2);
      sURL42 = stripHtml(dom42.window.document.getElementsByTagName('body')[0].innerHTML);
      benzerlikler[14]=stringSimilarity.compareTwoStrings(sURL0, sURL42).toString();
      console.log("0-4.2 --> "+benzerlikler[14]);
    
    var dom43 = await JSDOM.fromURL(x3)
      console.log("4.3 link -------> "+x3);
      sURL33 = stripHtml(dom43.window.document.getElementsByTagName('body')[0].innerHTML);
      benzerlikler[15]=stringSimilarity.compareTwoStrings(sURL0, sURL43).toString();
      console.log("0-4.3 --> "+benzerlikler[15]);
      
  var dom5 = await JSDOM.fromURL(req.body.yURL5)
  console.log("5. link -------> "+req.body.yURL5);
  sURL5 =  stripHtml(dom5.window.document.getElementsByTagName('body')[0].innerHTML);
  var x1 = dom5.window.document.links[3].href;
  var x2 = dom5.window.document.links[4].href;
  var x3 = dom5.window.document.links[5].href;
  benzerlikler[16]=stringSimilarity.compareTwoStrings(sURL0, sURL5).toString();
  console.log("0-5 --> "+benzerlikler[16]);

    var dom51 = await JSDOM.fromURL(x1)
      console.log("5.1 link -------> "+x1);
      sURL51 = stripHtml(dom51.window.document.getElementsByTagName('body')[0].innerHTML);
      benzerlikler[17]=stringSimilarity.compareTwoStrings(sURL0, sURL51).toString();
      console.log("0-5.1 --> "+benzerlikler[17]);
 
    var dom52 = await JSDOM.fromURL(x2)
      console.log("5.2 link -------> "+x2);
      sURL52 = stripHtml(dom52.window.document.getElementsByTagName('body')[0].innerHTML);
      benzerlikler[18]=stringSimilarity.compareTwoStrings(sURL0, sURL52).toString();
      console.log("0-5.2 --> "+benzerlikler[18]);
  
    var dom53 = await JSDOM.fromURL(x3)
      console.log("5.3 link -------> "+x3);
      sURL53 = stripHtml(dom53.window.document.getElementsByTagName('body')[0].innerHTML);
      benzerlikler[19]=stringSimilarity.compareTwoStrings(sURL0, sURL53).toString();
      console.log("0-5.3 --> "+benzerlikler[19]);
      
    res.write('<html>');
    res.write('<body>');
    res.write('<h1>Benzerlikler</h1>');
    res.write('<ul>');
    for (let i = 0; i < 5; i++) {
      res.write('<p>');
      res.write('</p>');
      res.write('<li>');
      res.write("0. link - "+(i+1)+". link --> " +benzerlikler[i]);
      res.write('</li>');
    
      for(j=1;j<4;j++){
        res.write('<li>');
        res.write("0. link - "+(i+1)+"."+j+". link --> " +benzerlikler[i+j]);
        res.write('</li>');
      }   
    }
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    res.end();  
    
});


