import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FaPencilAlt, FaTrash  }from "react-icons/fa";

const url ='http://localhost:3300/api/courses/';

class List extends Component{
    state={
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
                        <h1 className='mb-5'>List Courses</h1>
                    </div>
                </div>
                <div className='btn-new'><button typeof="button" onClick={()=>{this.setState({form: {name:'', credits:0, description: '', students:0}, tipoModal: 'insertar'}); this.modalInsertar()}} className="btn btn-success mb-4">New Course</button></div>   
                <div>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Credits</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            { this.state.data.map((course, i)=>{
                                return(
                                    <tr>
                                        <th scope="row">{course._id}</th>
                                        <td>{course.name}</td>
                                        <td>{course.credits}</td>
                                        <td><button typeof="button" onClick={async()=>{await this.seleccionarCourse(course); await this.modalInsertar()}} className="mr-p btn btn-primary mt-2"><FaPencilAlt /></button>
                                        <button typeof="button" onClick={async()=>{await this.seleccionarCourse(course); await this.setState({modalEliminar: true})}} className="btn btn-danger mt-2"><FaTrash /></button></td>
                                    </tr>
                                )
                            }) }
                        </tbody>
                    </table>
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

export default List;