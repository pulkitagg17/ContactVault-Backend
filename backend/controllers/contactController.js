const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
//@desc Get all contacts
//@route GET /api/contacts
//@access public(later private when authentication is implemented) - [PRIVATE IMPLEMENTED]

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id}); 
    res.status(200).json(contacts);
});

//@desc create new contact
//@route POST /api/contacts
//@access public(later private when authentication is implemented) - [PRIVATE IMPLEMENTED]

const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is :" , req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id // assuming user_id is the id of the authenticated user
    })
    res.status(201).json(contact);
});

//@desc Update contacts
//@route PUT /api/contacts/:id
//@access public(later private when authentication is implemented) - [PRIVATE IMPLEMENTED]


const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User not authorized to update this contact");
    } 

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true} // this option returns the updated document
    );
    res.status(200).json(updatedContact);
});

//@desc Get contacts
//@route GET /api/contacts/:id
//@access public(later private when authentication is implemented) - [PRIVATE IMPLEMENTED]
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access public(later private when authentication is implemented) - [PRIVATE IMPLEMENTED]
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User not authorized to delete this contact");
    }

    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports = {
    getContacts, 
    createContact,
    updateContact, 
    getContact, 
    deleteContact
};