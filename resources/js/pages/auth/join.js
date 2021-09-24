import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { BiLockAlt } from "react-icons/bi";
import { useAuth } from '../../context/auth';
import {register} from '../../api/auth';
import useInputValue from '../../components/input-value';
import GuestNav from '../../components/guest-nav';

function Join () {
  let history = useHistory();
  let { setCurrentUser, setToken } = useAuth();
  let email = useInputValue('email');
  let name = useInputValue('name');
  let password = useInputValue('password');
  let gocode = useInputValue('gocode');
  const handleSubmit = e => {
    e.preventDefault();

    register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password.value,

    }).then(({user, token}) => {
      setCurrentUser(user);
      setToken(token);
      history.push('/home');
    }).catch(error => {
      error.json().then(({errors}) => {
        ;[email, name, password].forEach(({parseServerError}) => parseServerError(errors));
      });
    });
  };

  return (

    <><GuestNav />
    <div className="flex justify-center items-center w-full flex-col py-4 min-h-screen bg-black">

        <div className="p-8 flex flex-col items-center">
            <div className="ajs-header text-center text-6xl leading-loose text-white font-bungee font-bold">
                AJ’s Experience
            </div>
        </div>

        <div className="box-border form-box-shadow mix-blend-normal rounded-3xl border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4 bg-black">
            <form onSubmit={handleSubmit}
                method="POST"
            >
                <div className="mb-4 mt-4">
                    <div className="mb-4 mt-2">
                        <label className="block text-white text-2xl mb-10 mt-10 text-center font-inter" htmlFor="username">
                            Join
                        </label>
                    </div>
                </div>
                <div className="w-full bg-black mb-4">
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="email"
                        className={`bg-black text-white appearance-none border-b-2 md:border-b-2 border-gray-200 border-opacity-25 font-inter rounded w-full py-1 px-3${email.error ? 'border-red-500' : ''}`}
                        required
                        autoFocus
                        {...email.bind} />
                        <FontAwesomeIcon
                            className="text-white fa-icon"
                            icon={faUser}/>
                    {email.error && <p className="text-red-500 text-xs pt-2">{email.error}</p>}
                </div>

                <div className="mb-4">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        className={`bg-black text-white appearance-none border-b-2 md:border-b-2 border-gray-200 border-opacity-25 font-inter rounded w-full py-1 px-3   ${password.error ? 'border-red-500' : ''}`}
                        minLength={6}
                        required
                        {...password.bind} />
                        <BiLockAlt className="text-white fa-icon inline" />
                    {password.error && <p className="text-red-500 text-xs pt-2">{password.error}</p>}
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        id="gocode"
                        name="gocode"
                        placeholder="go code (optional)"
                        className={`bg-black text-white placeholder-italic appearance-none border-b-2 md:border-b-2 border-gray-200 border-opacity-25 font-inter rounded w-full py-1 px-3 ${password.error ? 'border-red-500' : ''}`}
                        required
                        {...gocode.bind} />
                </div>

                <div className="mb-10 mt-10 flex justify-end">
                    <button className="border rounded-2xl px-3 py-2 text-white font-inter bg-black w-20 font-bold">
                        Go
                    </button>
                </div>
            </form>
        </div>
      </div></>
  );
}

export default Join;
