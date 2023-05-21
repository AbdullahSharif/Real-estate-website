const express = require("express");
const { 
    getAllProperties, 
    getSpecificProperties, 
    getPropertyCount, 
    getProperty, 
    createProperty, 
    updateProperty,
    deleteProperty, 
    getFeaturedProperties
} = require("../controllers/propertyController");


const router = express.Router();

const verifyJwt = require("../middleware/verifyJwt.js");

router.route("/all").get(getAllProperties);
router.route("/all/property").get(getSpecificProperties);
router.route("/all/property/count").get(getPropertyCount);
router.route("/all/property/:id").get(getProperty);
router.route("/all/property/featured").get(getFeaturedProperties);
router.route("/property/new").post( verifyJwt ,createProperty);
router.route("/property/update/:id").put(verifyJwt, updateProperty);
router.route("/property/delete/:id").delete(verifyJwt, deleteProperty);



module.exports = router;