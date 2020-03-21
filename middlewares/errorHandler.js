"use strict"

module.exports = function(err, req, res, next){
    console.log(err)
    if(err.name){
        switch(err.name){
            case "SequelizeConnectionError":
                res.status(500).json({msg: 'Something wrong with the database'})
                break
            case "SequelizeValidationError":
                res.status(400).json({msg: err.errors[0].message})
            case "SequelizeDatabaseError": 
                res.status(500).json({msg: 'Something wrong with the database'})
                break
            default:
                res.status(500).json({msg: 'Something wrong with the database'})
                break
        }
    }
    else {
        res.status(err.status).json({msg: err.msg})
    }
}   