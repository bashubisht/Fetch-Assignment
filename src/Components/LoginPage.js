import { useState } from "react";
import {useNavigate} from "react-router-dom";

const LoginPage = ()=>{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault(); 
    
    fetch("https://frontend-take-home-service.fetch.com/auth/login",{
      method: "POST",
      headers: { "Content-Type" : "application/json"},
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        email: email
    })
    
    }).then(response =>{
      navigate('/search');


    })
  }

    return(
        <div className="login-container">
          <div className="login-box">
            <h1>Fetch</h1>
            <h2>Find Your Perfect Dog</h2>
        <form onSubmit={handleSubmit}>
      
       <div className="form-group">
        <label>Enter User name</label>
        <input
        type="text"
        required
        value={name}
        onChange={(e)=> setName(e.target.value)}
        />
        </div>
        
        <div className="form-group">
        <label>Enter User Email</label>
        <input
        type="email"
        required
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        />
        </div>
        <button > Submit</button>
        </form>
        </div>
      
        </div>
    );
}
export default LoginPage;