import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentService from '../services/StudentService';

const ListStudentComponent = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        StudentService.getStudents().then((res) => {
            setStudents(res.data);
        });
    }, []);

    const deleteStudent = (id) => {
        StudentService.deleteStudent(id).then(() => {
            setStudents(students.filter((student) => student.id !== id));
        });
    };

    const viewStudent = (id) => {
        navigate(`/view-student/${id}`);
    };

    const editStudent = (id) => {
        navigate(`/add-student/${id}`);
    };

    const addStudent = () => {
        navigate('/add-student/_add');
    };

    return (
        <div>
            <h2 className="text-center">Students List</h2>
            <div className="row">
                <button className="btn btn-primary" onClick={addStudent}>
                    {' '}
                    Add Student
                </button>
            </div>
            <br />
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Student First Name</th>
                            <th> Student Last Name</th>
                            <th> Student Email Id</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td> {student.firstName} </td>
                                <td> {student.lastName}</td>
                                <td> {student.email}</td>
                                <td>
                                    <button
                                        onClick={() => editStudent(student.id)}
                                        className="btn btn-info"
                                    >
                                        Update{' '}
                                    </button>
                                    <button
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => deleteStudent(student.id)}
                                        className="btn btn-danger"
                                    >
                                        Delete{' '}
                                    </button>
                                    <button
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => viewStudent(student.id)}
                                        className="btn btn-info"
                                    >
                                        View{' '}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListStudentComponent;
