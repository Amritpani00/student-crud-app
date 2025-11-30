import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentService from '../services/StudentService';

const ListStudentComponent = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        setLoading(true);
        setError(null);
        StudentService.getStudents()
            .then((res) => {
                setStudents(res.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Failed to load students. Please try again.');
                setLoading(false);
                console.error('Error fetching students:', error);
            });
    };

    const deleteStudent = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            StudentService.deleteStudent(id)
                .then(() => {
                    setStudents(students.filter((student) => student.id !== id));
                    showSuccessMessage('Student deleted successfully!');
                })
                .catch((error) => {
                    setError('Failed to delete student. Please try again.');
                    console.error('Error deleting student:', error);
                });
        }
    };

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 3000);
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

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading students...</p>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Student Management System</h2>

            {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {successMessage}
                    <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
                </div>
            )}

            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                </div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Students List ({students.length})</h4>
                <button className="btn btn-primary" onClick={addStudent}>
                    <i className="bi bi-plus-circle"></i> Add New Student
                </button>
            </div>

            {students.length === 0 ? (
                <div className="alert alert-info text-center">
                    <h5>No students found</h5>
                    <p>Click "Add New Student" to create your first student record.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.email}</td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => viewStudent(student.id)}
                                            className="btn btn-sm btn-info me-2"
                                            title="View Details"
                                        >
                                            <i className="bi bi-eye"></i> View
                                        </button>
                                        <button
                                            onClick={() => editStudent(student.id)}
                                            className="btn btn-sm btn-warning me-2"
                                            title="Edit Student"
                                        >
                                            <i className="bi bi-pencil"></i> Edit
                                        </button>
                                        <button
                                            onClick={() => deleteStudent(student.id, `${student.firstName} ${student.lastName}`)}
                                            className="btn btn-sm btn-danger"
                                            title="Delete Student"
                                        >
                                            <i className="bi bi-trash"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ListStudentComponent;
