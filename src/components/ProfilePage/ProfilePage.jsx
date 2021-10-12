import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function ProfilePage() {
const history = useHistory();
const user = useSelector(store => store.user);
const editUser = useSelector(store => store.editUser);
const dispatch = useDispatch();


useEffect(() => {
dispatch({
    type: 'SET_USER_TO_EDIT',
    payload: user
    })
  }, [])

  const userProfile = (event) => {
    event.preventDefault();
    console.log('user before submit is ', editUser)
    alert('Changes Submitted');

    dispatch({
      type: 'UPDATE_PROFILE',
      payload: editUser
    });
    dispatch({ 
      type: 'FETCH_USER' 
    });
    }

    const handleChange = (event) => {
      dispatch({
        type: 'UPDATE_EDIT_USER',
        payload: {
            ...editUser, 
            [event.target.name]: event.target.value
        }
      });
    }

    return (
    <>
    <form className="formPanel" onSubmit={userProfile}>
      <h2 onClick={user}>Profile Page</h2>
      <div>
        <image src={user.image}/>
        {/* <label htmlFor="image">
          Add Profile Picture: 
          <input
            type="file"
            name="image"
            defaultValue={user.image}
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </label> */}
      </div>
      <div >
        <label htmlFor="first_name">
          First name:
          <input
            type="text"
            name="first_name"
            value={editUser.first_name}
            required
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label htmlFor="last_name">
          Last Name: 
          <input
            type="text"
            name="last_name"
            value={editUser.last_name}
            required
            onChange={handleChange}
          />
        </label>
      </div>
         <div>
        <label htmlFor="text">
          Email: 
          <input
            type="email"
            name="email"
            value={editUser.email}
            required
            onChange={handleChange}
          />
        </label>
      </div>
        <div>
        <label htmlFor="birthday">
          Birthdate:  
          <input
            type="date"
            name="birthday"
            value={editUser.birthday}
            required
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label htmlFor="country">
          Country: 
          <select
            type="text"
            name="country"
            value={editUser.country}
            required
            onChange={handleChange}
          >
          {/* <option defaultValue="United States of America">United States of America</option> */}
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
            // defaultValue={user.username}
            value={editUser.username}
            required
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Update" />
      </div>
    </form>   
      </>
    )
}    