require('colors');
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

app.get('/', function(req, res){
    let id = req.query.id;
    let month = req.query.month;
    let year = req.query.year;
    let url = 'https://jadwalsholat.org/adzan/monthly.php?id='+id+'&m='+month+'&y='+year;

    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var jadwal = [];

            $('table.table_adzan tr[align=center]').each((i, value) => {
                if(i>0&&i<$('table.table_adzan tr[align=center]').length-1) {
                    var jadwal_sementara = [];
                    $(value).find('td').each((j, data) => {
                        jadwal_sementara[j]=$(data).text();
                        // if ($(value).attr('class') === 'table_highlight')
                        //     return process.stdout.write($(data).text().red + '\t');
                        // return process.stdout.write($(data).text() + '\t');
                    });
                    var jadwal_per_hari = {
                        tgl: jadwal_sementara[0],
                        imsyak: jadwal_sementara[1],
                        subuh: jadwal_sementara[2],
                        terbit: jadwal_sementara[3],
                        dhuha: jadwal_sementara[4],
                        dzuhur: jadwal_sementara[5],
                        ashar: jadwal_sementara[6],
                        maghrib: jadwal_sementara[7],
                        isya: jadwal_sementara[8]
                    };
                    jadwal.push(jadwal_per_hari);
                    // process.stdout.write('\n');    
                }
                
            });

            // var jadwal = $('table.table_adzan tr[align=center]').text();
            var json = {
                id: id,
                jadwal: jadwal
            };
            res.send(json);
            // console.log(jadwal)
        }
    });
});

app.listen(3000);
console.log('API is running on http://localhost:3000');
module.exports = app;


// let url = 'https://jadwalsholat.org/adzan/monthly.php?id=151';

// request(url, function (err, res, body) {
//     if (err && res.statusCode !== 200) throw err;

//     let $ = cheerio.load(body);
//     $('table.table_adzan tr[align=center]').each((i, value) => {
//         $(value).find('td').each((j, data) => {
//             if ($(value).attr('class') === 'table_highlight')
//                 return process.stdout.write($(data).text().red + '\t');
//             return process.stdout.write($(data).text() + '\t');
//         });
//         process.stdout.write('\n');
//     });
// });

// var express=require('express');
// var app=express();
// app.get('/',function(req,res)
// {
// res.send('Hello World!');
// });
// var server=app.listen(8080,function() {});