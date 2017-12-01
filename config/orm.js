// Import MySQL connection.
var connection = require("../config/connection.js");

//Two Helper Functions
//First - Prints the question marks for queries i.e ["?","?"]...
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
  //Second - Converts object key/value pairs to SQL syntax
  function objToSql(ob) {
    var arr = [];
  
    //Pushes the key/value as a string into the arr
    for (var key in ob) {
      var value = ob[key];
      
      //Skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {

        //Adds quotations to strings with spaces
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
  
    //Translates the array of strings to a single comma-separated string
    return arr.toString();
  }

  //Object for all the SQL statement functions
  var orm = {
    //Select all function
    selectAll: function(tableInput, cb) {
    //This is format the query so you don't need to hard code the SELECT etc. everytime
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    //INSERT function to create additional entries
    insertOne: function(table, columns, vals, cb) {
      var queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += columns.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      console.log(queryString);
  
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
    //UPDATE function for updating existing database entries
    updateOne: function(table, objColVals, condition, cb) {
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
};

//Export the orm object for the model
module.exports = orm;