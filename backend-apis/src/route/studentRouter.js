const express = require("express");
const crudOperations = require("../services/crudOperations");
const router = express.Router();

// Import middleware
const auth = require("../middleware/auth");

// auth router => admin
router.post("/login", async function (req, res, next) {
    try {
        res.json(await crudOperations.isLogin("student", req.body.name, req.body.password));
        // req.authData = await crudOperations.isLogin("teacher", req.body.name, req.body.password);
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
});

// register
router.post("/register", async function (req, res, next) {
    try {
        // res.json(await crudOperations.isLogin(req.body.name, req.body.password));
        req.isRegister = await crudOperations.createtObject("student", ["name", "password", "ph_id"], req.body.name, req.body.password, req.body.phaseMaterial);
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
}, async function (req, res, next) {
    try {
        if (req.isRegister.ok) {
            res.json(await crudOperations.isLogin("student", req.body.name, req.body.password));
        } else {
            res.json(req.isRegister);
        }
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
});

// Create exam
router.post("/create-exam", auth, async function (req, res, next) {
    try {
        res.json(await crudOperations.createtObject("exams", ["name", "duration", "number", "t_id", "ph_id"], req.body.name, req.body.duration, req.body.number, req.user.roles[0].id, req.body.phaseId));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
});

// add answer
router.post("/add-answer", auth, async function (req, res, next) {
    try {
        res.json(await crudOperations.createtObject("answer_sheet", ["answer", "ex_id", "st_id", "cl_id", "qu_id"], req.body.answer, req.body.examId, req.user.roles[0].id, req.body.classId, req.body.questionId));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
});

/* ----------------------- classes ---------------- */
// get group
router.get("/get-group", auth, async function (req, res, next) {
    try {
        res.json(await crudOperations.getGroup(req.user.roles[0].id));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
});
// get live exams
router.get("/get-live-exams", auth, async function (req, res, next) {
    try {
        res.json(await crudOperations.getLiveExams(req.user.roles[0].id));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
});
// get group in phase
router.get("/get-group-in-phase", auth, async function (req, res, next) {
    try {
        res.json(await crudOperations.getGroupInPhase(req.user.roles[0].ph_id));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
});

module.exports = router