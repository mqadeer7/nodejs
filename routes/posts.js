const express = require('express');
const { find } = require('../models/Post');

const router = express.Router();
const Post =  require('../models/Post');

//showing all data
router.get('/', async (req, res) =>{

    try{
        const allPosts = await Post.find();
        res.json(allPosts);
    }
    catch(err){
        res.json({message: err});
    }
 });

 //shwoing specifc data with specific id
 
router.get('/:postId', async (req, res) =>{
    try{
    const showSinglePost = await Post.findById(req.params.postId);
    res.json(showSinglePost);
}catch(err){
    res.json({message: err });
}
});

// deleting post
router.delete('/:postId', async (req, res) =>{
    try{
    const deletePost = await Post.remove({_id: req.params.postId});
    res.json(deletePost);
}catch(err){
    res.json({message: err });
}
});

//update

router.patch('/:postId', async (req, res) =>{
    try{
    const updatedPost = await Post.updateOne({_id: req.params.postId}, { $set: { title: req.body.title}});
    res.json(updatedPost);
}catch(err){
    res.json({message: err });
}
});
 // inserting data
 router.post('/', async (req, res)=>{
    const postData = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try{
        const savePost = await postData.save();
        res.json(savePost);
    }catch(err){
        res.json({message: err });
    }
    
 });

 module.exports = router;

//  postData.save()
//     .then(data =>{
//         res.json(data);
//     })
//     .catch(err => {
//         res.json({message: err });
//     });