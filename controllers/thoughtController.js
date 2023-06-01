const { User, Thought } = require('../models');

module.exports = {

    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            const userObj = {
                thoughts,
            };
            return res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .lean();

            if (!thought) {
                return res.status(404).json({ message: 'No thoughts with that ID' });
            }

            res.json({
                thought,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a Thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create reaction 
    async createReaction(req, res) {
        try {
            console.log('You are adding a reaction');
            console.log(req.body);
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'No student found with that ID :(' })
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //delete a reaction 
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.reactionId },
                { $pull: { reactions: req.params.reactionId } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'No reactions found with that ID :(' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

};
