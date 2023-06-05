const router = require('express').Router();
const {
getThoughts,
createThought,
getSingleThought,
updateThought,
deleteThought,
createReaction,
deleteReaction,
} = require('../../controllers/thoughtController.js');

// get all thoughts - /api/thoughts

router.route('/').get(getThoughts).post(createThought);

//get single thought by _id - /api/thoughts/:thoughtId

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// create and remove reactions - /api/thoughts/:thoughtId/reactions

router.route('/:thoughtId/reactions').post(createReaction);

//remove reaction by reaction ID 
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
