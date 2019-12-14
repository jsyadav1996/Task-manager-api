const express = require('express');
const User = require('../db/models/user');
const auth = require('../middleware/auth');
const userRoute = new express.Router();
const multer = require('multer');
const sharp = require('sharp');
const {sendWelcomeEmail} = require('../emails/account');
const {sendCancelEmail} = require('../emails/account');
const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpeg|jpg|png)$/)){
            return cb(new Error('please upload a png, jpg or jpeg'));
        }
        cb(undefined, true);
    }
});

userRoute.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height:250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send(); 
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
});

userRoute.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send(); 
});

userRoute.get('/users/:id/avatar', async (req, res) => {
    const user = await User.findById(req.params.id);
    try {
        if(!user || !user.avatar){
            throw new Error();
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        return res.send(404);
    }
});

userRoute.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (e) {
        res.status(400).send({ error: "Unable to login!"});
    }
});

userRoute.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

userRoute.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return req.token !== token.token;
        });
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();        
    }
});

userRoute.post('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

userRoute.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        sendCancelEmail(req.user.email, req.user.name);
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
});

userRoute.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (error) {
        res.status(400).send(error)
    }
});

userRoute.patch('/users/me', auth, async (req, res) => {
    const allowedUpdates = ['name', 'password', 'age'];
    const updates = Object.keys(req.body);
    const isValidUpdated = updates.every((property) => {
        return allowedUpdates.includes(property);
    });

    if(!isValidUpdated){
        return res.status(400).send({ error: "Invalid Updates!"});
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(404).send(error);
    }
});

module.exports = userRoute;