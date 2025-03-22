import { useState } from 'react';

function LoginForm({ onSwitchToSignUp, onLoginSuccess }) {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('https://ngoapi.onrender.com/get-user-by-credentials', { // Ensure API URL is correct
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();

                // Set session storage values
                sessionStorage.setItem("loggedInUser", data.name);
                sessionStorage.setItem("loggedInEmail", data.email);
                sessionStorage.setItem("loggedInPhone", data.phone);
                sessionStorage.setItem("loggedInAdd", data.address);
                sessionStorage.setItem("loggedInType", data.type);

                setSuccess(`Welcome, ${data.name}!`);
                onLoginSuccess(data); // Pass user data to App component
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('Failed to login. Try again later.');
        }
    };

    return (
        <div className="card p-4 shadow">
            <form onSubmit={handleLogin} className='loginForm'>
                <h2>Login</h2>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control Inputs"
                        placeholder="Email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control Inputs"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100"><i class="fa-solid fa-right-to-bracket"></i> Log in</button>
            </form>
            <div className="text-center mt-3">
                <button className="btn-link" onClick={onSwitchToSignUp}><i class="fa-solid fa-right-to-bracket"></i> Sign Up</button>
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
    );
}

export default LoginForm;
