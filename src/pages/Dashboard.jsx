import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FaPencilAlt, FaTrash  }from "react-icons/fa";
import {urlbase, state_base} from "../data/control"

const url =urlbase;

class Dashboard extends Component{
    state=state_base
    peticionGET=()=>{
        axios.get(url).then(response=>{
            this.setState({data: response.data.result});
          }).catch(error=>{
            console.log(error.message);
          })
    };
    peticionPost=async()=>{
        delete this.state.form.id;
        this.state.form.name= this.state.form.name ? this.state.form.name : "new course";
        this.state.form.credits= this.state.form.credits ? this.state.form.credits : 0;
        this.state.form.description= this.state.form.description ? this.state.form.description : "new course";
       await axios.post(url,this.state.form).then(response=>{
          this.modalInsertar()
          this.componentDidMount()
        }).catch(error=>{
          console.log(error.message);
        })
      }
      peticionPatch=()=>{
        this.state.form.name= this.state.form.name ? this.state.form.name : "new course";
        this.state.form.credits= this.state.form.credits ? this.state.form.credits : 0;
        this.state.form.description= this.state.form.description ? this.state.form.description : "new course";
        axios.patch(url+this.state.form.id, this.state.form).then(response=>{
          this.modalInsertar()
          this.componentDidMount()
        })
      }
      peticionDelete=()=>{
       axios.delete(url+this.state.form.id).then(response=>{
            this.setState({modalEliminar: false})
            this.componentDidMount()
        })
      }
      modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
      }
    seleccionarCourse=(course)=>{
        this.setState({
          tipoModal: 'actualizar',
          form: {
            id: course._id,
            name: course.name,
            credits: course.credits,
            description: course.description,
            students: course.students
          }
        })
      }
      handleChange=async e=>{
        e.persist();
        await this.setState({
          form:{
            ...this.state.form,
            [e.target.name]: e.target.value
          }
        });
        console.log(this.state.form);
        }
  
    componentDidMount() { 
        this.peticionGET();
     };
    render(){
        const {form}=this.state;
        return (
            <div className='main_container limit-div'>
                <div className='titulo-head'>
                    <div className='subtitle'>
                        <h1 className='mb-5'>Dashboard</h1>
                    </div>
                </div>
                <div className='btn-new'><button typeof="button" onClick={()=>{this.setState({form: {name:'', credits:0, description: '', students:0}, tipoModal: 'insertar'}); this.modalInsertar()}} className="btn btn-success mb-4">New Course</button></div>   
                <div className='cards-responsive'>
                    { this.state.data.map((course, i)=>{
                        return(
                            <div key={i} className="mr-p card bg-light mb-3 d-inline-block">
                                <div className="card-header">Id: {course._id}</div>
                                <div className="card-body">
                                    <h5 className="card-title">{course.name}</h5>
                                    <p className="card-text">Credits: <b>{course.credits}</b><br />
                                        Students: <b>{course.students}</b><br />
                                        Description: {course.description}
                                    </p><br />
                                    <button typeof="button" onClick={async()=>{await this.seleccionarCourse(course); await this.modalInsertar()}} className="mr-p btn btn-primary"><FaPencilAlt /> Ver/Editar</button>
                                    <button typeof="button" onClick={async()=>{await this.seleccionarCourse(course); await this.setState({modalEliminar: true})}} className="btn btn-danger"><FaTrash /> Eliminar</button>
                                </div>
                            </div>
                        )
                    }) }
                </div>
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{display: 'block'}}>
                        <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: ''}/>
                            <br />
                            <label htmlFor="name">name</label>
                            <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form?form.name: ''}/>
                            <br />
                            <label htmlFor="name">Credits</label>
                            <input className="form-control" type="number" name="credits" id="credits" onChange={this.handleChange} value={form?form.credits: ''}/>
                            <br />
                            <label htmlFor="id">Students</label>
                            <input className="form-control" type="text" name="students" id="students" readOnly onChange={this.handleChange} value={form?form.students: '0'}/>
                            <br />
                            <label htmlFor="description">Description</label>
                            <input className="form-control" type="text" name="details" id="details" onChange={this.handleChange} value={form?form.description:''}/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.tipoModal=='insertar'?
                            <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                                Save
                            </button>: <button className="btn btn-primary" onClick={()=>this.peticionPatch()}>
                                Update
                            </button>
                        }
                        <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancel</button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Are you sure? (You won't be able to revert this (id= {form && form.id})!)
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    };
};

export default Dashboard;