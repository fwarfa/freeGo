import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function ProfilePage() {
   
    useEffect(() => {
    userProfile();
  }, []);

  const [first_name, setFirst_Name] = useState('');
  const [username, setUserName]= useState('')
  const [last_name, setLast_Name] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState('');
  const [image, setImage] = useState('');

  const history = useHistory();
  const user = useSelector(store => store.user);

  const dispatch = useDispatch();




  const userProfile = (event) => {
    event.preventDefault();
    alert('changes been submitted');

    dispatch({
      type: 'EDIT_PROFILE',
      payload: {
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email,
        birthday: birthday, 
        country: country, 
        image: image, 
      }
    });
    }
  
  }; // end registerUser


    return (
    <>
    {user.length > 0 ? (
    user.map((items, i) => (
        <div key={i}>
    <form className="formPanel" onSubmit={userProfile}>
      <h2>Profile Page</h2>
      <div>
        <image src={user.image}/>
        <label htmlFor="image">
          Add Profile Picture: 
          <input
            type="file"
            name="image"
            defaultValue={user.image}
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </label>
      </div>
      <div >
        <label htmlFor="first_name">
          First name:
          <input
            type="text"
            name="first_name"
            defaultValue={user.first_name}
            value={first_name}
            required
            onChange={(event) => setFirst_Name(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="last_name">
          Last Name: 
          <input
            type="text"
            name="last_name"
            defaultValue={user.last_name}
            value={last_name}
            required
            onChange={(event) => setLast_Name(event.target.value)}
          />
        </label>
      </div>
         <div>
        <label htmlFor="text">
          Email: 
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
        <div>
        <label htmlFor="birthday">
          Birthdate:  
          <input
            type="date"
            name="birthday"
            defaultValue={user.birthday}
            value={birthday}
            required
            onChange={(event) => setBirthday(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="country">
          Country: 
          <select
            type="text"
            name="country"
            defaultValue={user.country}
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
      <div>
        <label htmlFor="username">
         Username:
          <input
            type="text"
            name="username"
            defaultValue={user.username}
            value={username}
            required
            onChange={(event) => setUserName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Profile" />
      </div>
    </form>   
        </div>
           ))
      ) : (
        <p>Loading...</p>
      )}
      </>
      
    )
