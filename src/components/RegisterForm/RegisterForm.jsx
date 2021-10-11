import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
   const [isDisabled, setIsDisabled] = useState(true);
  const [first_name, setFirst_Name] = useState('');
  const [username, setUserName]= useState('')
  const [last_name, setLast_Name] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [accept_terms, setAccept_Terms] = useState(false);
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

  console.log("radio button state is", accept_terms)
   const canBeSubmitted = () => {
     return accept_terms ? setIsDisabled(true) : setIsDisabled(false);
   };
   const onCheckboxClick = () => {
    setAccept_Terms(!accept_terms);
     return canBeSubmitted();
   };

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}

      <div>
        <label htmlFor="first_name">
          First name:
          <input
            type="text"
            name="first_name"
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
            value={last_name}
            required
            onChange={(event) => setLast_Name(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="image">
          Add Profile Picture:
          <input
            type="file"
            name="image"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="text">
          Email:
          <input
            type="email"
            name="email"
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
            value={country}
            required
            onChange={(event) => setCountry(event.target.value)}
          >
            <option defaultValue="United States of America">
              United States of America
            </option>
            <option value="United States of America">
              United States of America
            </option>
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
            value={username}
            required
            onChange={(event) => setUserName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="text"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Re-enter Password:
          <input
            type="text"
            name="password"
            value={password2}
            required
            onChange={(event) => setPassword2(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="accept_terms">
          <input
            type="radio"
            name="accept_terms"
            defaultChecked
            value={accept_terms}
            required
            onChange={(event) => setAccept_Terms(event.target.value)}
            disabled={isDisabled}
          />{" "}
          I accept{" "}
          <a
            href="#exampleModalLong"
            data-toggle="modal"
            data-target="#exampleModalLong"
          >
            terms and condition
          </a>
          <div
            class="modal fade"
            id="exampleModalLong"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLongTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Terms of Service
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <br />
                <h3 class="modal-body">Section 1</h3>
                <div class="modal-body">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Incidunt ab animi laboriosam perferendis maxime quia, eum
                  quibusdam nesciunt hic dolore placeat culpa. Recusandae illum
                  dolorem est laudantium nam odio, aliquam sit, laborum
                  distinctio eius delectus voluptatem aut. Exercitationem saepe
                  adipisci odio pariatur porro esse laudantium et, quia, alias
                  laborum qui tempore velit. Ipsum, ut expedita provident neque
                  dicta corporis, eius fuga doloribus, voluptate dolor
                  asperiores. Vel voluptas dolores dolorem modi perferendis
                  cumque praesentium temporibus maxime natus reiciendis placeat
                  molestias consequatur, deleniti itaque nostrum in. Ut animi
                  assumenda necessitatibus obcaecati. Vitae ea totam laborum
                  amet odit. Fugiat animi facilis dolorum. Facilis unde eligendi
                  ut eos accusantium laboriosam aperiam amet provident, saepe
                  aut maxime magnam eum maiores eaque commodi possimus officiis
                  error quae corporis incidunt sapiente tempora rem debitis
                  porro? Explicabo ex debitis eius voluptatibus quam minus.
                  Totam, quo nemo. Hic eos iure distinctio rerum dolores qui
                  illum. Impedit expedita sit sunt.
                </div>
                <br />
                <h3 class="modal-body">Section 1</h3>
                <div class="modal-body">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Incidunt ab animi laboriosam perferendis maxime quia, eum
                  quibusdam nesciunt hic dolore placeat culpa. Recusandae illum
                  dolorem est laudantium nam odio, aliquam sit, laborum
                  distinctio eius delectus voluptatem aut. Exercitationem saepe
                  adipisci odio pariatur porro esse laudantium et, quia, alias
                  laborum qui tempore velit. Ipsum, ut expedita provident neque
                  dicta corporis, eius fuga doloribus, voluptate dolor
                  asperiores. Vel voluptas dolores dolorem modi perferendis
                  cumque praesentium temporibus maxime natus reiciendis placeat
                  molestias consequatur, deleniti itaque nostrum in. Ut animi
                  assumenda necessitatibus obcaecati. Vitae ea totam laborum
                  amet odit. Fugiat animi facilis dolorum. Facilis unde eligendi
                  ut eos accusantium laboriosam aperiam amet provident, saepe
                  aut maxime magnam eum maiores eaque commodi possimus officiis
                  error quae corporis incidunt sapiente tempora rem debitis
                  porro? Explicabo ex debitis eius voluptatibus quam minus.
                  Totam, quo nemo. Hic eos iure distinctio rerum dolores qui
                  illum. Impedit expedita sit sunt.
                </div>
                <div class="modal-footer">
                  {accept_terms === false ? (
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-dismiss="modal"
                      onClick={onCheckboxClick}
                    >
                      Accept
                    </button>
                  ) : (
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-dismiss="modal"
                      onClick={onCheckboxClick}
                    >
                      Disagree
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>
      <div>
        <input
          className="btn"
          type="submit"
          name="submit"
          value="Sign Up"
          disabled={isDisabled}
        />
      </div>
    </form>
  );
}

export default RegisterForm;
