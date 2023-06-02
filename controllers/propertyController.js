const Property = require("../models/Property.js");


exports.getAllProperties = async function (req, res) {
    try {
        const properties = await Property.find().populate("currentOwner", "-password");
        if(!properties) return res.status(200).json({
            saved: true,
            message: "No properties to show!"
        });

        return res.status(200).json({
            saved: true,
            message: "properties fetched!",
            properties
        })
        
    } catch (error) {
        return res.status(500).json({
            saved: false,
            message: error.message
        })
    }
}

// get specific type of properties.
exports.getSpecificProperties = async (req, res) => {
    try {
        const {type} = req.query;

        if(type) {
            const properties = await Property.find({type}).populate("currentOwner", "-password");
            return res.status(200).json({
                saved: true,
                message: `fetched all the properties of type: ${type}`,
                properties
            })
        }else{
            res.status(200).json({
                saved: true,
                message: "No such property exists!"
            })
        }

    } catch (error) {
        return res.status(500).json({
            saved: false,
            message: error.message
        })
    }
}


// get property count.
exports.getPropertyCount = async (req, res) => {
    try {
        const residential = await Property.countDocuments({type: "residential"})
        const commercial = await Property.countDocuments({type: "commercial"})

        return res.status(200).json({
            saved: true,
            message: "Property count fetched!",
            residential,
            commercial
        })
        
    } catch (error) {
        return res.status(500).json({
            saved: false,
            message: error.message
        })
        
    }
}

// get a single property.
exports.getProperty = async (req, res) => {
    try {

        const property = await Property.findById(req.params.id).populate("currentOwner", "-password");

        if(!property) {
            throw new Error("No such property exists!");
        }

        return res.status(200).json({
            saved: true,
            message: "Property fetched!",
            property
        })
        
    } catch (error) {
        return res.status(500).json({
            saved: false,
            message: error.message
        })
        
    }
}

exports.getFeaturedProperties = async (req, res) => {
    try {

        // const properties = await Property.find({featured}).populate("currentOwner","-password");
        // let properties = await Property.find().populate("currentOwner", "-password");
        console.log(1);
        let properties = await Property.find().populate("currentOwner", "-password");

        // properties = properties.filter(property => property.featured == true);

        if(!properties) return res.status(200).json({
            saved: true,
            message: "No featured properties listed at this time!"
        })

        return res.status(200).json({
            saved: true,
            message: "Fetched the featured properties.",
            properties
        })
        
    } catch (error) {
        console.log(2)
        return res.status(500).json({
            saved: false,
            message: error.message
        })
    }
}

// create a new property.
exports.createProperty = async (req, res) => {
    try {
        const newProperty = await Property.create({...req.body, currentOwner: req.user._id})
        if(!newProperty) throw new Error("Failed to create a new property!");

        return res.status(201).json({
            saved: true,
            message: "Property created successfully!",
            property : newProperty
        })
        
    } catch (error) {
        return res.status(500).json({
            saved: false,
            message: error.message
        })
        
    }
}

// update property.
exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if(property.currentOwner.toString() != req.user._id.toString()) {
            console.log(property.currentOwner)
            console.log(req.user._id)

            return res.status(401).json({
                saved: false,
                message: "You cannot update other people's property!"
            })
        }

        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        )

        return res.status(201).json({
            saved: true,
            message: "Property updated successfully!",
            property: updatedProperty
        })

        
    } catch (error) {
        return res.status(500).json({
            saved: false,
            message: error.message
        })
        
    }
}

exports.deleteProperty = async (req, res) => {
    try{
        const property = await Property.findById(req.params.id);
        if(property.currentOwner.toString() != req.user._id.toString()) {
            
            throw new Error("You can not delete other people's property!");
        
        }

        await property.deleteOne();
        return res.status(200).json({
            saved: true, 
            message: "property deleted successfully!"
        })

    } catch (error) {
        return res.status(500).json({
            saved: false,
            message: error.message
        })
        
    }
}