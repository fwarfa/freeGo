import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [first_name, setFirst_Name] = useState('');
  const [username, setUserName]= useState('')
  const [last_name, setLast_Name] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [accept_terms, setAccept_Terms] = useState(true);
  const [password2, setPassword2] = useState('');
  const [image, setImage] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    if (password === password2){

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        first_name: first_name,
        password: password,
        last_name: last_name,
        email: email,
        birthday: birthday, 
        country: country, 
        accept_terms: accept_terms, 
        image: image, 
      }
    });
  }
  else {
    alert('Passwords is not matching incorrect');
  }
  }; // end registerUser

  return (

    <form className="formPanel card card-form" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className="form-group">
        <label htmlFor="first_name">
          First name:
          <input
            className="form-control"
            type="text"
            name="first_name"
            value={first_name}
            required
            onChange={(event) => setFirst_Name(event.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="last_name">
          Last Name: 
          <input
            className="form-control"
            type="text"
            name="last_name"
            value={last_name}
            required
            onChange={(event) => setLast_Name(event.target.value)}
          />
        </label>
      </div>
      <div className="form-group"> 
        <label htmlFor="image">
          Add Profile Picture: 
          <input
            className="form-control"
            type="file"
            name="image"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </label>
      </div>
         <div className="form-group">
        <label htmlFor="text">
          Email: 
          <input
            className="form-control"
            type="email"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
        <div className="form-group">
        <label htmlFor="birthday">
          Birthdate:  
          <input
            className="form-control"
            type="date"
            name="birthday"
            value={birthday}
            required
            onChange={(event) => setBirthday(event.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="country">
          Country: 
          <select
            className="form-control"
            type="text"
            name="country"
            value={country}
            required
            onChange={(event) => setCountry(event.target.value)}
          >
          <option defaultValue="United States of America">United States of America</option>
          <option value="United States of America">United States of America</option>
          <option value="South America">South America</option>
          <option value="Canada">Canada</option>
          </select>
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="username">
         Username:
          <input
            className="form-control"
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUserName(event.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="password">
          Password:
          <input
            className="form-control"
            type="text"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
       <div className="form-group">
        <label htmlFor="password">
          Re-enter Password:
          <input
            className="form-control"
            type="text"
            name="password"
            value={password2}
            required
            onChange={(event) => setPassword2(event.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="accept_terms">
          Accept Terms:
          <input 
            type="checkbox"
            name="accept_terms"
            value={accept_terms}
            required
            onChange={(event) => setAccept_Terms(event.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <input className="btn btn-primary" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
