import Post from '../models/Post.js';

export default async (req, res, next) => {
    let post;

    try {
        post = await Post.findById(req.params.id);
        
        if (post === null) {
            return req.status(404).json({ message: 'Cannot find post' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.post = post;

    next();
};