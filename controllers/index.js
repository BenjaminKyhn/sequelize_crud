const models = require('../database/models');

const createPost = async (req, res) => {
    try {
        const post = await models.Post.create(req.body);
        return res.status(201).json({
            post,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await models.Post.findAll({
            include: [
                {
                    model: models.Comment,
                    as: 'comments'
                },
                {
                    model: models.User,
                    as: 'author'
                }
            ]
        });
        return res.status(200).json({ posts });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await models.Post.findOne({
            where: { id: postId },
            include: [
                {
                    model: models.Comment,
                    as: 'comments',
                    include: [
                        {
                            model: models.User,
                            as: 'author',
                        }
                    ]
                },
                {
                    model: models.User,
                    as: 'author'
                }
            ]
        });
        if (post) {
            return res.status(200).json({ post });
        }
        return res.status(404).send('Post with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
}
