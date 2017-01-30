// WEB SCRAPER
// SCRAPES NEWEST EVENT FROM AMS
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

  
  url = 'http://www.amsmeteors.org/members/imo_view/browse_reports/';
  
  request(url, function(error, response, html){
    
    if (!error){
      var $ = cheerio.load(html);
      
      
      $('.table.table-hover.table-condensed.table-results').filter(function(){
        
        var data = $(this);
        var info = data.children('tbody'); //table with all event information
        
        var table_rows = info.children();
        
        var information = [];
        
        for (var i = 1; i < table_rows.length; i++){
          
          var id_master, time_master, country_master, city_master, duration_master;
          
          var id = table_rows.eq(i).children().eq(0).text();
          id_master = id.trim();
          console.log(id.trim());
          
          var time = table_rows.eq(i).children().eq(1).text();
          if(time == ""){
            break; //stops at a specific period of time
          }
          time_master = time.trim();
          console.log(time.trim());
          
          var country = table_rows.eq(i).children().eq(3).text();
          country_master = country.trim();
          console.log(country.trim());
          
          var city = table_rows.eq(i).children().eq(4).text();
          city_master = city.trim();
          console.log(city.trim());
          
          var duration = table_rows.eq(i).children().eq(6).text();
          duration_master = duration.trim();
          console.log(duration.trim());
          
          information[i-1] = new Array(id_master, time_master, country_master, city_master, duration_master);
          
        }
        console.log(information);
        
        var info_json = [];
        
        for (var i = 0; i < information.length; i++){
          var entry ={
            'id': information[i][0],
            'time': information[i][1],
            'country': information[i][2],
            'city': information[i][3],
            'duration': information[i][4]
          }
          info_json.push(entry);           
        }
        console.log(info_json);
        
        var json = JSON.stringify(info_json);
        fs.writeFile('project/public/output.json', json, function(err){
            console.log('Written file');
         });
        
        //fs.readFile('output.json', 'utf8', function(err, data){
         // if(err) throw err;
          //var obj = JSON.parse(data);
          
         // console.log(obj);
       // });
         
      })
    }   
    
})
