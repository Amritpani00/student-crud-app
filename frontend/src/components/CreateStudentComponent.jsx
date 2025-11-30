import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentService from '../services/StudentService';

const CreateStudentComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id !== '_add') {
            setLoading(true);
            StudentService.getStudentById(id)
                .then((res) => {
                    let student = res.data;
                    setFirstName(student.firstName);
                    setLastName(student.lastName);
                    setEmail(student.email);
                    setLoading(false);
                })
                .catch((error) => {
                    setError('Failed to load student data. Please try again.');
                    setLoading(false);
                    console.error('Error fetching student:', error);
                });
        }
    }, [id]);

    const validateForm = () => {
        const newErrors = {};

        if (!firstName.trim()) {
            newErrors.firstName = 'First name is required';
        } else if (firstName.trim().length < 2) {
            newErrors.firstName = 'First name must be at least 2 characters';
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        } else if (lastName.trim().length < 2) {
            newErrors.lastName = 'Last name must be at least 2 characters';
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[A-Za-z0-9+_.-]+@(.+)$/.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const saveOrUpdateStudent = (e) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        let student = { firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() };

        const savePromise = id === '_add'
            ? StudentService.createStudent(student)
            : StudentService.updateStudent(student, id);

        savePromise
            .then(() => {
                navigate('/students');
            })
            .catch((error) => {
                setLoading(false);
                const errorMessage = error.response?.data?.message || 'Failed to save student. Please try again.';
                setError(errorMessage);
                console.error('Error saving student:', error);
            });
    };

    const cancel = () => {
        navigate('/students');
    };

    const getTitle = () => {
        return id === '_add' ? 'Add New Student' : 'Update Student';
    };

    if (loading && id !== '_add') {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h3 className="text-center mb-0">{getTitle()}</h3>
                        </div>
                        <div className="card-body">
                            {error && (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {error}
                                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                                </div>
                            )}

                            <form onSubmit={saveOrUpdateStudent}>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">
                                        First Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        placeholder="Enter first name"
                                        name="firstName"
                                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                        value={firstName}
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                            if (errors.firstName) {
                                                setErrors({ ...errors, firstName: null });
                                            }
                                        }}
                                    />
                                    {errors.firstName && (
                                        <div className="invalid-feedback">{errors.firstName}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">
                                        Last Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        placeholder="Enter last name"
                                        name="lastName"
                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                        value={lastName}
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                            if (errors.lastName) {
                                                setErrors({ ...errors, lastName: null });
                                            }
                                        }}
                                    />
                                    {errors.lastName && (
                                        <div className="invalid-feedback">{errors.lastName}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email Address <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter email address"
                                        name="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (errors.email) {
                                                setErrors({ ...errors, email: null });
                                            }
                                        }}
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                </div>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={cancel}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-save"></i> Save Student
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateStudentComponent;
