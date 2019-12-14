const express = require('express');
const app = express();
const mongoose = require('./db/mongoose');
// const Task = require('./db/models/task');
const taskRouter = require('./routes/tasks');
const userRouter = require('./routes/users');
const port = process.env.PORT;
// console.log(process.env.SENDGRID_API_KEY);

// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// }

// app.use(allowCrossDomain);

// app.use((req, res, next) => {
//     res.status(503).send('Site is under maintainance, please try back soon!');
// });

app.use(express.json());
app.use(taskRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log('Server is up for port ' + port);
});