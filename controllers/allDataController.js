const schoolsSchema = require('../models/schoolModels');
const collegesSchema = require('../models/collegesModels');
exports.getAllData = async (req, res) => {
    try {
        const schoolList = await schoolsSchema.find();
        const collegeList = await collegesSchema.find();

        console.log("school",schoolList.length);
        console.log("college",collegeList.length);
        res.status(200).json({
            success: true,
            schoolList,
            collegeList
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};