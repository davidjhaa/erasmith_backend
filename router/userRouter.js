const express = require('express');
const {
  addUser,
  getAllUsers,
  editUser,
  deleteUser,
  login
} = require('../controller/userController'); 

const router = express.Router();

router.post('/', addUser);          
router.get('/', getAllUsers);  
router.post('/login', login)     
router.put('/:id', editUser);      
router.delete('/:id', deleteUser); 

module.exports = router;
