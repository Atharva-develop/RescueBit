import React, { useState } from 'react';

function SignUpForm({ onSwitchToLogin }) {
    const [signUpData, setSignUpData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        type: 'NGO',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            console.log('Sign Up Data:', signUpData);   
            const response = await fetch('https://ngoapi.onrender.com/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUpData),
            });

            if (response.ok) {
                setSuccess('Registration successful. Please login again.');
                setTimeout(onSwitchToLogin, 1500);
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to register. Try again.');
            }
        } catch (err) {
            setError('Failed to register. Try again later.');
            console.error('Sign Up Error:', err);
        }
    };

    return (
        <div className="card p-4 shadow">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control Inputs"
                        placeholder="Name"
                        value={signUpData.name}
                        onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control Inputs"
                        placeholder="Email"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="tel"
                        className="form-control Inputs"
                        placeholder="Phone"
                        value={signUpData.phone}
                        onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control Inputs"
                        placeholder="Password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control Inputs"
                        placeholder="Address"
                        value={signUpData.address}
                        onChange={(e) => setSignUpData({ ...signUpData, address: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <select
                        className="form-control Inputs"
                        value={signUpData.type}
                        onChange={(e) => setSignUpData({ ...signUpData, type: e.target.value })}
                        required
                    >
                        <option value="NGO">NGO</option>
                        <option value="Restaurant">Restaurant</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-success w-100">Register</button>
                <div className="text-center mt-3">
                    <button className="btn btn-link" onClick={onSwitchToLogin}>Back to Login</button>
                </div>
            </form>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
    );
}

export default SignUpForm;
