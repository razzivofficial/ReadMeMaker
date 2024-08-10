const Editor = require('../models/Editor.model')


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


module.exports = {
    addEditor,
    fetcheditors,
    fetchbyemail,
    upvoteEditorplus,
    upvoteEditorminus,
    downvoteEditorplus,
    downvoteEditorminus,
}
