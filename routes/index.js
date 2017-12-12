var express = require('express');
var router = express.Router();
var path = require('path');
var dbService = require('../DatabaseService/dbService');
var MongoClient = require('mongodb').MongoClient;
var uri = 'mongodb://CIS550Project:CIS550ProjectPassword@yelpcomments-shard-00-00-r2vwc.mongodb.net:27017,yelpcomments-shard-00-01-r2vwc.mongodb.net:27017,yelpcomments-shard-00-02-r2vwc.mongodb.net:27017/test?ssl=true&replicaSet=YelpComments-shard-0&authSource=admin';

// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'db550hugang.c82xzguu2hvf.us-east-2.rds.amazonaws.com',
	user: 'db550hugang',
	password: 'db550password',
  database: 'db550',
  port: '3306'
});

// MongoClient.connect(uri, function(err, db) {
//   // console.log(db);
//
//   var ndb = db.db('test');
//   console.log('connedted!');
//   var pro = ndb.collection('comments').find({business_id:"uYHaNptLzDLoV_JZ_MuzUA"});
//   //ndb.collection('comments').find({business_id:id}).toArray(function(err, res){
//
//   // });
//   // var temp = pro.next();
//   setTimeout( () => {
//     console.log('Printing results: ');
//     // // console.log(result);
//     // pro.forEach(function(val){
//     //   cmts.push(val);
//     //   console.log(val);
//     // });
//     pro.toArray(function(err, result){
//       if (err) throw err;
//       console.log(result);
//     });
//
//     console.log('Ending');
//     // console.log(typeof(temp));
//     // res.json(temp);
//   }, 10000);
//   console.log('ended!');
// });
//
//
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/comment', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'comment.html'));
});

router.get('/insert', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'insert.html'));
});

router.get('/family', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'family.html'));
});

router.get('/data/:hotelName', function(req,res) {

    var hotelName = req.params.hotelName;
    dbService.nearByRest(hotelName, res);
});

router.post('/qComment/', function(req,res) {
    var resName = req.body.resName;
    dbService.qComment(resName, res);
});

/*
router.get('/data/', function(req, res)
{
    var query2 = 'SELECT p.*, COUNT(f.friend) as num ' +
        'FROM Person p LEFT JOIN Friends f ' +
        'ON p.login = f.login ';
    query2 = query2 + ' GROUP BY p.login';

    console.log(query2);
    connection.query(query2, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            res.json(rows);
        }
    });
});
 */

router.get('/qCityHotel/:name',function(req,res) {
    var cityName = req.params.name;
    dbService.qCityHotel(cityName, res);
});

// ----Your implemention of route handler for "Insert a new record" should go here-----

router.get('/data/login/:login/name/:name/sex/:sex/RelationshipStatus/:RelationshipStatus/Birthyear/:Birthyear',
    function(req,res) {
  var login = req.params.login;
  var name = req.params.name;
  var sex = req.params.sex;
  var relation = req.params.RelationshipStatus;
  var birthyear = req.params.Birthyear;

  var query = "INSERT INTO Person VALUES('"+login+"', '"+name+"', '"+sex+"', '"+relation+"', "+birthyear+");"

  console.log(login+' '+name+' '+sex+' '+relation+' '+birthyear);
  connection.query(query, function(err, rows, fields) {
      if (err) console.log(err);
      else {
        res.json(rows);
      }
  });
})

router.get('/person/:name',
    function(req,res) {
        var name = req.params.name;
        console.log("family name = " + name);

        var query = 'SELECT p.*, f.role as role ' +
            'FROM Person p JOIN Family f ' +
            'ON p.login = f.member ' +
            'WHERE f.login = "' + name + '"';
        connection.query(query, function(err, rows, fields) {
            if (err) console.log(err);
            else {
                res.json(rows);
            }
        });
    })

router.get('/personDropDown',
    function(req,res) {

        console.log("Drop down menu hit");

        var query = 'SELECT DISTINCT f.login ' +
            'FROM Family f ';
        connection.query(query, function(err, rows, fields) {
            if (err) console.log(err);
            else {
                console.log(rows);
                res.json(rows);
            }
        });
    })

module.exports = router;
