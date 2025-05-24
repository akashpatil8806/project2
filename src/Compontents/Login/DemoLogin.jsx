import React, { useState } from 'react';
import './DemoLogin.css';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); //  For redirect


  const handleLogin = async (e) => {
    
    // e.preventDefault();

    // if (!email || !password) {
    //   alert('Please fill in all fields.');
    //   return;
    // }

    // // TODO: Handle authentication logic here
    // // 
    // // TODO: Replace with real authentication
    // if (email === 'admin@example.com' && password === 'admin123') {
    //   //  Redirect to dashboard on successful login
    //   navigate('/DashBoard');
    // } else {
    //   alert('Invalid credentials!');
    // }

    //******** this the  code for the fecth data from database */
      e.preventDefault();
    
      if (!email || !password) {
        alert('Please fill in all fields.');
        return;
      }
    
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
    
        const data = await response.json();
    
        if (data.success) {
          localStorage.setItem('userName', data.name);

          navigate('/DashBoard');
        } else {
          alert('Invalid credentials!');
        }
      } catch (err) {
        console.error('Error logging in:', err);
        alert('Server error. Please try again.');
      }
    
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" >Sign In</button>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
