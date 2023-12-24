const express = require("express");
const crudOperations = require("../services/crudOperations");
const router = express.Router();

// Import middleware
const auth = require("../middleware/auth");
const { admin, patient } = require("../middleware/roles");

// auth router => admin
router.post("/login", async function (req, res, next) {
    try {
        res.json(await crudOperations.isLogin("teacher", req.body.name, req.body.password));
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
        req.isRegister = await crudOperations.createtObject("teacher", ["name", "password", "Specialization"], req.body.name, req.body.password, req.body.Specialization);
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
}, async function (req, res, next) {
    try {
        if (req.isRegister.ok) {
            res.json(await crudOperations.isLogin("teacher", req.body.name, req.body.password));
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
        // res.json(await crudOperations.createtObject("exams", ["name", "duration", "number", "t_id", "ph_id"], req.body.name, req.body.duration, req.body.number, req.user.roles[0].id, req.body.phaseId));
        req.createExamInfo = await crudOperations.createtObject("exams", ["name", "duration", "number", "t_id", "ph_id"], req.body.name, req.body.duration, req.body.number, req.user.roles[0].id, req.body.phaseId);
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
}, async function (req, res, next) {
    try {
        if (req.createExamInfo.ok) {
            res.json(await crudOperations.checkData("exams", "name", req.body.name));
        } else {
            res.json(req.createExamInfo);
        }
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
});

// add question
router.post("/add-question", auth, async function (req, res, next) {
    try {
        res.json(await crudOperations.createtObject("question", ["question_name", "option1", "option2", "option3", "option4", "answer", "question_number", "ex_id"], req.body.questionName, req.body.option1, req.body.option2, req.body.option3, req.body.option4, req.body.answer, req.body.questionNumber, req.body.examId));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
});
// get exam phase
router.get("/get-exam-phase/:phaseId", auth, async function (req, res, next) {
    try {
        res.json(await crudOperations.getExamTeacherPhase(req.user.roles[0].id, req.params.phaseId));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
});
// get class phase
router.get("/get-class-phase", auth, async function (req, res, next) {
    try {
        res.json(await crudOperations.getClassTeacherPhase(req.user.roles[0].id, req.body.phaseId));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
});
// get student in class
router.get("/get-student-in-class", auth, async function (req, res, next) {
    try {
        res.json(await crudOperations.getStudentInClass(req.body.classId));
    } catch (err) {
        console.error(`Error while update user `, err.message);
    }
    next();
});

module.exports = router