import Post from "../models/Post";
import User from "../models/User";

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });

        await newPost.save();
        const postFeed = Post.find();
        res.status(201).json(postFeed);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const postFeed = Post.find();
        res.status(200).json(postFeed);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
