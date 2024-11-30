const Group = require("../model/groupModel");

module.exports.createGroup = async (req, res) => {
    try {
        const { groupName,description, roles } = req.body;

        const newGroup = new Group({ groupName, description, roles });
        await newGroup.save();

        res.status(201).json({ message: "Group created successfully", group: newGroup });
    } catch (error) {
        res.status(500).json({ error: "Failed to create group", details: error.message });
    }
};

module.exports.getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch groups", details: error.message });
    }
};

module.exports.updateGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const { groupName,description, roles } = req.body;

        const updatedGroup = await Group.findByIdAndUpdate(
            id,
            { groupName, description, roles },
            { new: true }
        );

        if (!updatedGroup) {
            return res.status(404).json({ error: "Group not found" });
        }

        res.status(200).json({ message: "Group updated successfully", group: updatedGroup });
    } catch (error) {
        res.status(500).json({ error: "Failed to update group", details: error.message });
    }
};

module.exports.deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedGroup = await Group.findByIdAndDelete(id);

        if (!deletedGroup) {
            return res.status(404).json({ error: "Group not found" });
        }

        res.status(200).json({ message: "Group deleted successfully", group: deletedGroup });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete group", details: error.message });
    }
};
