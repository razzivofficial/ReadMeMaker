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
      
      // Use find to get multiple documents with the given email
      const editors = await Editor.find({ email: email });
      
      if (editors.length === 0) {
          return res.status(404).json({
              message: "No editors found with this email",
          });
      }

      res.status(200).json({
          message: "Editors fetched successfully",
          editors: editors,
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
  
  const updateAvatar = async (req, res) => {
    const { email, avatar } = req.body;

    try {
        // Update all users with the specified email
        const result = await Editor.updateMany(
            { email: email },
            { $set: { avatar: avatar } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'No users found with the specified email' });
        }

        res.status(200).json({ message: 'Avatar updated successfully for all matching users' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateUsername = async (req, res) => {
    const { email, username } = req.body;

    try {
        // Update all users with the specified email
        const result = await Editor.updateMany(
            { email: email },
            { $set: { username: username } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'No users found with the specified email' });
        }

        res.status(200).json({ message: 'Username updated successfully for all matching users' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateEditor = async (req, res) => {
  const { editorId } = req.params; // Assuming the ID is passed as a route parameter
  const { title, description, tag, type, markdown } = req.body;

  try {

    const updatedEditor = await Editor.findByIdAndUpdate(
      editorId, 
      {
        $set: {
          title: title,
          description: description,
          tag: tag,
          type: type,
          markdown: markdown
        }
      },
      { new: true } // This option returns the updated document
    );

    // If no editor is found with the given ID
    if (!updatedEditor) {
      return res.status(404).json({ message: 'Editor not found' });
    }

    // Successfully updated
    res.status(200).json({
      message: 'Editor updated successfully',
      editor: updatedEditor
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update editor', error: error.message });
  }
};

const deleteEditor = async (req, res) => {
  const { editorId } = req.params; // Assuming the ID is passed as a route parameter

  try {
    const deletedEditor = await Editor.findByIdAndDelete(editorId);

    // If no editor is found with the given ID
    if (!deletedEditor) {
      return res.status(404).json({ message: 'Editor not found' });
    }

    // Successfully deleted
    res.status(200).json({
      message: 'Editor deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete editor', error: error.message });
  }
};

module.exports = {
    addEditor,
    fetcheditors,
    fetchbyemail,
    upvoteEditor,
    downvoteEditor,
    checkVoteStatus,
    updateAvatar,
    updateUsername,
    updateEditor,
    deleteEditor
}
