const express = require('express'); 
const router = express.Router();
const {createGroup, getAllGroups, updateGroup, deleteGroup} = require('../controller/groupController')

router.post('/', createGroup);          
router.get('/', getAllGroups);    
router.put('/:id', updateGroup);      
router.delete('/:id', deleteGroup); 

module.exports = router;
