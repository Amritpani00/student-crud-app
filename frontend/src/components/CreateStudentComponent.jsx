import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentService from '../services/StudentService';

const CreateStudentComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (id !== '_add') {
            StudentService.getStudentById(id).then((res) => {
                let student = res.data;
                setFirstName(student.firstName);
                setLastName(student.lastName);
                setEmail(student.email);
            });
        }
    }, [id]);

    const saveOrUpdateStudent = (e) => {
        e.preventDefault();
        let student = { firstName, lastName, email };
        console.log('student => ' + JSON.stringify(student));

        if (id === '_add') {
            StudentService.createStudent(student).then(() => {
                navigate('/students');
            });
        } else {
            StudentService.updateStudent(student, id).then(() => {
                navigate('/students');
            });
        }
    };

    const cancel = () => {
        navigate('/students');
    };

    const getTitle = () => {
        if (id === '_add') {
            return <h3 className="text-center">Add Student</h3>;
        } else {
            return <h3 className="text-center">Update Student</h3>;
        }
    };

    return (
        <div>
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {getTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> First Name: </label>
                                    <input
                                        placeholder="First Name"
                                        name="firstName"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Last Name: </label>
                                    <input
                                        placeholder="Last Name"
                                        name="lastName"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Email Id: </label>
                                    <input
                                        placeholder="Email Address"
                                        name="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <button className="btn btn-success" onClick={saveOrUpdateStudent}>
                                    Save
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={cancel}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateStudentComponent;
