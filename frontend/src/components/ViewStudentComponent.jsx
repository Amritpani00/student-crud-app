import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentService from '../services/StudentService';

const ViewStudentComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        StudentService.getStudentById(id)
            .then((res) => {
                setStudent(res.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Failed to load student details. Student may not exist.');
                setLoading(false);
                console.error('Error fetching student:', error);
            });
    }, [id]);

    const goBack = () => {
        navigate('/students');
    };

    const editStudent = () => {
        navigate(`/add-student/${id}`);
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Error!</h4>
                    <p>{error}</p>
                    <hr />
                    <button className="btn btn-primary" onClick={goBack}>
                        Back to Students List
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-header bg-info text-white">
                            <h3 className="text-center mb-0">Student Details</h3>
                        </div>
                        <div className="card-body">
                            {student && (
                                <>
                                    <div className="mb-3 row">
                                        <label className="col-sm-4 col-form-label fw-bold">Student ID:</label>
                                        <div className="col-sm-8">
                                            <p className="form-control-plaintext">{student.id}</p>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-4 col-form-label fw-bold">First Name:</label>
                                        <div className="col-sm-8">
                                            <p className="form-control-plaintext">{student.firstName}</p>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-4 col-form-label fw-bold">Last Name:</label>
                                        <div className="col-sm-8">
                                            <p className="form-control-plaintext">{student.lastName}</p>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-4 col-form-label fw-bold">Email Address:</label>
                                        <div className="col-sm-8">
                                            <p className="form-control-plaintext">
                                                <a href={`mailto:${student.email}`}>{student.email}</a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-4 col-form-label fw-bold">Full Name:</label>
                                        <div className="col-sm-8">
                                            <p className="form-control-plaintext">
                                                {student.firstName} {student.lastName}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="card-footer">
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button className="btn btn-secondary" onClick={goBack}>
                                    <i className="bi bi-arrow-left"></i> Back to List
                                </button>
                                <button className="btn btn-warning" onClick={editStudent}>
                                    <i className="bi bi-pencil"></i> Edit Student
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewStudentComponent;
