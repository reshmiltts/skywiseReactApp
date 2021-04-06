import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployee extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            serialNo: '',
            description: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id === '_add') {
            return
        } else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    name: employee.name,
                    serialNo: employee.serialNo,
                    description: employee.description
                });
            });
        }
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = { name: this.state.name, serialNo: this.state.serialNo, description: this.state.description };
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if (this.state.id === '_add') {
            EmployeeService.createEmployee(employee).then(res => {
                this.props.history.push('/employees');
            });
        } else {
            EmployeeService.updateEmployee(employee, this.state.id).then(res => {
                this.props.history.push('/employees');
            });
        }
    }

    changeFirstNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ serialNo: event.target.value });
    }

    changeEmailHandler = (event) => {
        this.setState({ description: event.target.value });
    }

    cancel() {
        this.props.history.push('/employees');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Employee</h3>
        } else {
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                    <br></br>
                    <div className="container">
                        <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>  Name: </label>
                                            <input placeholder="Name" name="name" className="form-control"
                                                value={this.state.name} onChange={this.changeFirstNameHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label> Serial No: </label>
                                            <input placeholder="Serial No" name="lastName" className="form-control"
                                                value={this.state.serialNo} onChange={this.changeLastNameHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label> Description: </label>
                                            <input placeholder="Description" name="emailId" className="form-control"
                                                value={this.state.description} onChange={this.changeEmailHandler} />
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateEmployee