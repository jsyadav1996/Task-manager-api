const express = require('express');
const Task = require('../db/models/task');
const auth = require('../middleware/auth');
const taskRoute = new express.Router();

taskRoute.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error)
    }
});

taskRoute.get('/tasks', auth, async (req, res) => {
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const sort = {};
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        const Tasks = await Task.find({owner: req.user._id}).limit(limit).skip(skip).sort(sort);
        if(!Tasks){
            res.status(404).send();
        }
        res.send(Tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

taskRoute.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({_id, owner: req.user._id});
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(404).send(error);
    }
});

taskRoute.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['description', 'completed'];
    const updates = Object.keys(req.body);
    const isValidUpdated = updates.every((property) => {
        return allowedUpdates.includes(property);
    });

    if(!isValidUpdated){
        return res.status(400).send({ error: "Invalid Updates!"});
    }
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
        if(!task){
            return res.status(404).send({ error: "Task not found"});
        }
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(404).send(error);
    }
});

taskRoute.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({_id, owner: req.user._id});
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(404).send(error);
    }
});

module.exports = taskRoute;