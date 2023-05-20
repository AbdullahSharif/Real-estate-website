const multer = require("multer");

const router = require("express").Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename);
    },
})

const upload = multer({
    storage: storage,
});

router.post("/image", upload.single("images"), async (req, res) => {
    try {
        return res.status(200).json({
            saved: true,
            message:"File uploded successfully"
        });

    } catch (error) {
        console.error(error);
    }
})


module.exports = router;
