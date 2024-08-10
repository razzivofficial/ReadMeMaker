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

const upvoteEditorplus = async (req, res) => {
    try {
        const { id } = req.params;
        const editor = await Editor.findById(id);

        if (!editor) {
            return res.status(404).json({
                message: "Editor not found",
            });
        }

        editor.upvotes += 1;  // Increment upvotes by 1
        await editor.save();  // Save the updated editor

        res.status(200).json({
            message: "Upvote updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update upvote",
            error: error.message,
        });
    }
};
const upvoteEditorminus = async (req, res) => {
    try {
        const { id } = req.params;
        const editor = await Editor.findById(id);

        if (!editor) {
            return res.status(404).json({
                message: "Editor not found",
            });
        }

        editor.upvotes -= 1;  
        await editor.save();  

        res.status(200).json({
            message: "Upvote updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update upvote",
            error: error.message,
        });
    }
};

// Increment downvotes for an editor
const downvoteEditorplus = async (req, res) => {
    try {
        const { id } = req.params;
        const editor = await Editor.findById(id);

        if (!editor) {
            return res.status(404).json({
                message: "Editor not found",
            });
        }

        editor.downvotes += 1;  // Increment downvotes by 1
        await editor.save();  // Save the updated editor

        res.status(200).json({
            message: "Downvote updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update downvote",
            error: error.message,
        });
    }
};
const downvoteEditorminus = async (req, res) => {
    try {
        const { id } = req.params;
        const editor = await Editor.findById(id);

        if (!editor) {
            return res.status(404).json({
                message: "Editor not found",
            });
        }

        editor.downvotes -= 1;  
        await editor.save();  

        res.status(200).json({
            message: "Downvote updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update downvote",
            error: error.message,
        });
    }
};


const upvoteEditor = async (req, res) => {
    try {
        const { userId, editorId } = req.body;

        // Find the user and editor
        const user = await User.findById(userId);
        const editor = await Editor.findById(editorId);

        if (!user || !editor) {
            return res.status(404).json({ message: 'User or editor not found' });
        }

        // Check if user has already upvoted
        if (user.upvoteIds.includes(editorId)) {
            return res.status(400).json({ message: 'You have already upvoted this editor' });
        }

        // Remove any existing downvote
        user.downvoteIds = user.downvoteIds.filter(id => !id.equals(editorId));

        // Add upvote
        user.upvoteIds.push(editorId);
        await user.save();

        // Increment upvote count on Editor
        await Editor.findByIdAndUpdate(editorId, { $inc: { upvotes: 1 } });

        res.status(200).json({ message: 'Upvote recorded' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to record upvote', error: error.message });
    }
};

const downvoteEditor = async (req, res) => {
    try {
        const { userId, editorId } = req.body;

        // Find the user and editor
        const user = await User.findById(userId);
        const editor = await Editor.findById(editorId);

        if (!user || !editor) {
            return res.status(404).json({ message: 'User or editor not found' });
        }

        // Check if user has already downvoted
        if (user.downvoteIds.includes(editorId)) {
            return res.status(400).json({ message: 'You have already downvoted this editor' });
        }

        // Remove any existing upvote
        user.upvoteIds = user.upvoteIds.filter(id => !id.equals(editorId));

        // Add downvote
        user.downvoteIds.push(editorId);
        await user.save();

        // Increment downvote count on Editor
        await Editor.findByIdAndUpdate(editorId, { $inc: { downvotes: 1 } });

        res.status(200).json({ message: 'Downvote recorded' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to record downvote', error: error.message });
    }
};


module.exports = {
    addEditor,
    fetcheditors,
    fetchbyemail,
    upvoteEditorplus,
    upvoteEditorminus,
    downvoteEditorplus,
    downvoteEditorminus,

    upvoteEditor,
    downvoteEditor

}
