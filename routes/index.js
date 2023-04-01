const express = require('express')
const router = express.Router()

const Subscriber = require('../models/subscribers');

// create a subscriber
router.post('/create', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        channel: req.body.channel
    })
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// get all subscribers
router.get('/list', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.status(200).json(subscribers)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/:id', getSubscriberDetails, (req, res) => {
    res.json(res.subscriber)
})

router.patch('/:id', getSubscriberDetails, async (req, res) => {
    if(req.body.name != null){
        res.subscriber.name = req.body.name;
    }
    if(req.body.channel != null){
        res.subscriber.channel = req.body.channel;
    }
    try{
        const updatedSubscriber = await res.subscriber.save();
        res.status(200).json(updatedSubscriber)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.delete('/:id', getSubscriberDetails, async (req, res) => {
    let name = res.subscriber.name;
    try{
        await res.subscriber.deleteOne();
        res.json({message: `${name} subscriber has been deleted`})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

async function getSubscriberDetails(req, res, next){
    let subscriber;
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({message : "Cannot find subscriber"})
        }
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
    res.subscriber = subscriber;
    next()
}

module.exports = router;