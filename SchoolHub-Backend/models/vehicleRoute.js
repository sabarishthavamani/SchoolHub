const express = require('express')
const mongoose = require('mongoose')
const schema = mongoose.Schema;

const vehicleRouteSchema = new schema({
    vehicleNumber:{
        type:String,
        required: true,
    },
    vehicleRegisterNumber:{
        type:String,
        required:true
    },
    busStartingPoint:{
        type:String,
        required:true
    },
    busStartingTime:{
        type:String,
        required:true
    },
    busStops:[{
        id:{
            type:String,
            required:true
        },
        stop:{
            type:String,
            required:true
        },
        timing:{
            type:String,
            required:true
        }
    }],
    active:{
        type:Number,
        default:1
    },
});

module.exports = mongoose.model('vehicleRoute',vehicleRouteSchema);