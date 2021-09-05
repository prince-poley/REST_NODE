import express from 'express';
import Post from '../models/Post.js';
import getPost from '../middlewares/getPost.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', getPost, (req, res) => {
    res.json(res.post);
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;

    const post = new Post({ title, description });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', getPost, async (req, res) => {
    const { title, description } = req.body;
    
    if (title !== null) {
        res.post.title = title;
    }

    if (description !== null) {
        res.post.description = description;
    }

    try {
        const updatedPost = await res.post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', getPost, async (req, res) => {
    try {
        await res.post.remove();
        res.json({ message: 'Deleted post' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;