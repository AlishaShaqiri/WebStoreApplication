
const fs = require('fs');
const path = require('path');
const connection = require('./db');


const runSQLScript = (filePath) => {

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading SQL file:', err);
      return;
    }

    const sqlStatements = data.split(';').map(statement => statement.trim()).filter(statement => statement.length > 0);

    sqlStatements.forEach((statement, index) => {
      connection.query(statement, (err, result) => {
        if (err) {
          console.error(`Error executing SQL statement at index ${index + 1}:`, err);
          return;
        }
        console.log(`SQL statement ${index + 1} executed successfully:`, result);
      });
    });
  });
};


module.exports = runSQLScript;
