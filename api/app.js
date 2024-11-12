const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const runSQLScript = require('./setupDatabase');
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",  
        methods: ["GET", "POST"],        
        allowedHeaders: ["Content-Type"],
        credentials: true               
    }
});
// // // Run the SQL script to set up the database tables
// const sqlFilePath = path.join(__dirname, 'database.sql'); 
// runSQLScript(sqlFilePath);

app.use(cors()); 
app.use(bodyParser.json());

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server, io };
