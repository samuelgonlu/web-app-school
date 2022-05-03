import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
const urlbase ='http://localhost:1578/api/courses/';
const state_base={
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
            name: '',
            credits: '',
            description: '',
            students: 0,
            tipoModal: ''
        }
    };

export {urlbase, state_base};