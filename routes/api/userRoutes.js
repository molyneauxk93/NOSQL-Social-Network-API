const router = require('express').Router();
const {
getUser,
createUser,
getSingleUser,
updateUser,
deleteUser,
addFriend,
deleteFriend,
} = require('../../controllers/userController');

// get all users - /api/users

router.route('/').get(getUser).post(createUser);

// get single user by id - /api/users/:userId

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// add new friend to user friends list and delete friend from user friend list  - /api/user/:userId/friends/:friendId

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
