import React from 'react';

const FooterComponent = () => {
    return (
        <footer className="footer mt-auto py-3 bg-light border-top">
            <div className="container text-center">
                <span className="text-muted">
                    © {new Date().getFullYear()} Student Management System. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
};

export default FooterComponent;
