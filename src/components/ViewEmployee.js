import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ViewEmployee extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            this.setState({ employee: res.data });
        })
    }

    render() {
        return (
            <div>
                <div class="bg_image">
                    <br></br>
                    <div className="card col-md-6 offset-md-3">
                        <h3 className="text-center"> View Employee Details</h3>
                        <div className="card-body">
                            <div className="row">
                                <label> Employee First Name: </label>
                                <div> {this.state.employee.name}</div>
                            </div>
                            <div className="row">
                                <label> Employee Last Name: </label>
                                <div> {this.state.employee.serialNo}</div>
                            </div>
                            <div className="row">
                                <label> Employee Email ID: </label>
                                <div> {this.state.employee.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewEmployee