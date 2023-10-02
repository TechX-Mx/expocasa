const http = require('http');
const { db } = require('./src/db.js');
const app = require('./src/app.js');

require('dotenv').config();

const port = process.env.PORT || 4000;

const httpServer = http.createServer(app);

db.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully');
    httpServer.listen(port, () => {
      console.log(`Server listening at ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });