import React from 'react';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-primary shadow">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <i className="bi bi-mortarboard-fill me-2"></i>
                        Student Management System
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to="/students" className="nav-link">
                                    <i className="bi bi-people-fill"></i> Students
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/add-student/_add" className="nav-link">
                                    <i className="bi bi-plus-circle"></i> Add Student
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;
