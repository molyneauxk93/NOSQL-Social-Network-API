// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {

    // Get all users
    async getUser(req, res) {
        try {
            const users = await User.find().populate('thoughts');
            const userObj = {
                users,
            };
            return res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .lean();

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json({
                user,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // create a new student
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a user and remove their thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No such user exists' })
            }

            const thought = await Thought.deleteMany(
                { _id: {$in: user.thoughts} },  // how do i do this with username instead
    
            );

            if (!thought) {
                return res.status(404).json({
                    message: 'Student deleted, but no thoughts found',
                });
            }

            res.json({ message: 'Student successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add friend to user 
    async addFriend(req, res) {
        try {
            console.log('You are adding a friend');
            console.log(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $addToSet: { friends: req.body } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with that ID' })
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Remove assignment from a student
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friends: { friendId: req.params.friendId } } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No friend found with that ID :(' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

};