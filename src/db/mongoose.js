const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim : true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim : true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid');
//             }
//         }
//     },
//     password:{
//         type: String,
//         required: true,
//         trim : true,
//         minlength: 6,
//         maxlength: 12,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error("Password must not contain 'password'");
//             }
//         }
//     },
//     age:{
//         type: Number,
//         validate(value){
//             if(value < 0){
//                 throw new Error("Age must not be less than 0!");
//             }
//         }
//     }
// });

// const user = new User({
//     name: '    george    ',
//     email: '  email1@something.com',
//     password: 'something',
//     age: 5,
// });

// user.save().then(() => {
//     console.log(user);
// }).catch((error) => {
//     console.log(error);
// });

// const task = new Task({
//     description: '  task 3  ',
//     // completed: true
// });

// task.save().then(() => {
//     console.log(task);
// }).catch((error) => {
//     console.log(error);
// });