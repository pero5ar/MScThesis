const express = require('express');
const asyncWrap = require('express-async-wrap');

const authenticate = require('../../middleware/authentication.middleware');

const ExerciseController = require('../../controllers/exercise.controller');

const router = express.Router();

router.post('/:exerciseId/attempts', authenticate, asyncWrap(ExerciseController.createAttempt));

router.put('/:exerciseId/attempts/:attemptId', authenticate, asyncWrap(ExerciseController.updateAttempt));

module.exports = router;
