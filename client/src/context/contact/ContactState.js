import React, { useReducer } from 'react';
import {v4 as uuid} from 'uuid' 
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

const ContactState = props => {
    const initialState = {
    contacts: [
        {
            id: 1, 
            name: 'quangnc',
            email: 'quangnc@gmail.com', 
            phone: '111-111-111', 
            type: 'personal'
        }, 
        {
            id: 2, 
            name: 'binhdh',
            email: 'binhdh103@gmail.com', 
            phone: '222-222-222', 
            type: 'professional'
        }, 
        {
            id: 3,
            name: 'congnv',
            email: 'nvcong@gmail.com', 
            phone: '333-333-333', 
            type: 'personal'
        }
    ], 
    current: null, 
    filtered: null
};

const [state, dispatch] = useReducer(contactReducer, initialState);

//add contact 
const addContact = contact => {
    contact.id = uuid(); 
    dispatch({type: ADD_CONTACT, payload: contact}); 
}

//delete contact 
const deleteContact = id => {
    dispatch({type: DELETE_CONTACT, payload: id}); 
}

//set current contact 
const setCurrent = contact => {
    dispatch({type: SET_CURRENT, payload: contact}); 
}
//clear current contact
const clearCurrent = () => {
    dispatch({type: CLEAR_CURRENT}); 
}

//update contact
const updateContact = contact => {
    dispatch({type: UPDATE_CONTACT, payload: contact}); 
}

//filter contact
const filterContacts = text => {
    dispatch({type: FILTER_CONTACTS, payload: text}); 
}

//clear filter
const clearFilter = () => {
    dispatch({type: CLEAR_FILTER}); 
}


    return (
        <ContactContext.Provider value={{
            contacts: state.contacts, 
            current: state.current,
            filtered: state.filtered,
            addContact, 
            deleteContact, 
            setCurrent, 
            clearCurrent,
            updateContact, 
            filterContacts,
            clearFilter

        }}
            >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;
  