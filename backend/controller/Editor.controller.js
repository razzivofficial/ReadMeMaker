const Editor = require('../models/Editor.model')
const User = require('../models/Users.model');

const addEditor = async ( req, res)=>{
    try{
        const newEditor = new Editor(req.body);
        await newEditor.save();
        res.status(201).json({message:"Editor added successfully"})
    }
    catch(error){
        res.status(500).json({message:"failed to save editor"})

    }
}

const fetcheditors = async (req, res) => {
    try{
        const editors = await Editor.find();

        if(editors.length === 0){
            return res.status(404).json({message:"No editors found"})
        }

        res.status(200).json({message:"Editor added successfully",editors:editors})
    }
    catch(error){
        res.status(500).json({message:"Failed to fetch editors"})
}
}

const fetchbyemail = async (req, res) => {
    try {
        const { email } = req.params;
        const editor = await Editor.findOne({ email: email });
        
        if (!editor) {
            return res.status(404).json({
                message: "Editor not found",
            });
        }

        res.status(200).json({
            message: "Editor fetched successfully",
            editor: editor,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch editor data",
            error: error.message,
        });
    }
};




const upvoteEditor = async (req, res) => {
    try {
      const { userId, editorId } = req.body;
  
      const user = await User.findById(userId);
      const editor = await Editor.findById(editorId);
  
      if (!user || !editor) {
        return res.status(404).json({ message: 'User or editor not found' });
      }
  
      // Toggle upvote
      if (user.upvoteIds.includes(editorId)) {
        // Remove upvote
        user.upvoteIds = user.upvoteIds.filter(id => !id.equals(editorId));
        await user.save();
        await Editor.findByIdAndUpdate(editorId, { $inc: { upvotes: -1 } });
        return res.status(200).json({ message: 'Upvote removed' });
      } else {
        // Remove any existing downvote
        user.downvoteIds = user.downvoteIds.filter(id => !id.equals(editorId));
  
        // Add upvote
        user.upvoteIds.push(editorId);
        await user.save();
        await Editor.findByIdAndUpdate(editorId, { $inc: { upvotes: 1 } });
        return res.status(200).json({ message: 'Upvote recorded' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to record upvote', error: error.message });
    }
  };
  

  const downvoteEditor = async (req, res) => {
    try {
      const { userId, editorId } = req.body;
  
      const user = await User.findById(userId);
      const editor = await Editor.findById(editorId);
  
      if (!user || !editor) {
        return res.status(404).json({ message: 'User or editor not found' });
      }
  
      // Toggle downvote
      if (user.downvoteIds.includes(editorId)) {
        // Remove downvote
        user.downvoteIds = user.downvoteIds.filter(id => !id.equals(editorId));
        await user.save();
        await Editor.findByIdAndUpdate(editorId, { $inc: { downvotes: -1 } });
        return res.status(200).json({ message: 'Downvote removed' });
      } else {
        // Remove any existing upvote
        user.upvoteIds = user.upvoteIds.filter(id => !id.equals(editorId));
  
        // Add downvote
        user.downvoteIds.push(editorId);
        await user.save();
        await Editor.findByIdAndUpdate(editorId, { $inc: { downvotes: 1 } });
        return res.status(200).json({ message: 'Downvote recorded' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to record downvote', error: error.message });
    }
  };
  

  const checkVoteStatus = async (req, res) => {
    try {
      const { userId, editorId } = req.query;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const hasUpvoted = user.upvoteIds.includes(editorId);
      const hasDownvoted = user.downvoteIds.includes(editorId);
  
      res.status(200).json({ hasUpvoted, hasDownvoted });
    } catch (error) {
      res.status(500).json({ message: 'Failed to check vote status', error: error.message });
    }
  };
  


module.exports = {
    addEditor,
    fetcheditors,
    fetchbyemail,
    upvoteEditor,
    downvoteEditor,
    checkVoteStatus
}
