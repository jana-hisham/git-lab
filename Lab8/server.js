const express = require('express');
const app = express();
app.use(express.json());

const users = [];
const posts = [];
let userId = 1;
let postId = 1;
let commentId = 1;                                                  

// Users
app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    if (!req.body.name) return res.status(400).json({ message: 'Name is required' });
    const user = { id: userId++, name: req.body.name };
    users.push(user);
    res.status(201).json(user);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

// Posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/posts', (req, res) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }
    const post = {
        id: postId++,
        title: req.body.title,
        content: req.body.content,
        likes: 0,
        comments: []
    };
    posts.push(post);
    res.status(201).json(post);
});

app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
});

app.put('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }
    post.title = req.body.title;
    post.content = req.body.content;
    res.json(post);
});

app.delete('/posts/:id', (req, res) => {
    const index = posts.findIndex(p => p.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Post not found' });
    posts.splice(index, 1);
    res.status(204).end();
});

// Likes
app.post('/posts/:id/like', (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.likes++;
    res.json({ likes: post.likes });
});

app.delete('/posts/:id/like', (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.likes > 0) post.likes--;
    res.json({ likes: post.likes });
});

// Comments
app.get('/posts/:id/comments', (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post.comments);
});

app.post('/posts/:id/comments', (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (!req.body.content) return res.status(400).json({ message: 'Content is required' });
    const comment = { id: commentId++, content: req.body.content };
    post.comments.push(comment);
    res.status(201).json(comment);
});

app.delete('/posts/:id/comments/:commentId', (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const index = post.comments.findIndex(c => c.id === Number(req.params.commentId));
    if (index === -1) return res.status(404).json({ message: 'Comment not found' });
    post.comments.splice(index, 1);
    res.status(204).end();
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
