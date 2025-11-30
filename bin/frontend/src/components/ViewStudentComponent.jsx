import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StudentService from '../services/StudentService';

const ViewStudentComponent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState({});

    useEffect(() => {
        StudentService.getStudentById(id).then((res) => {
            setStudent(res.data);
        });
    }, [id]);

    return (
        <div>
            <br />
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center"> View Student Details</h3>
                <div className="card-body">
                    <div className="row">
                        <label> Student First Name: </label>
                        <div> {student.firstName}</div>
                    </div>
                    <div className="row">
                        <label> Student Last Name: </label>
                        <div> {student.lastName}</div>
                    </div>
                    <div className="row">
                        <label> Student Email ID: </label>
                        <div> {student.email}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewStudentComponent;
