import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { application } from '../../api/auth';
import useInputValue from '../../components/input-value';

function Application () {
  let history = useHistory();
  let { setCurrentUser, setToken } = useAuth();
  let name = useInputValue('name');
  const handleSubmit = e => {
    e.preventDefault();

    application({
      name: name.value
    }).then(({ user }) => {
      history.push('/home');
    }).catch(error => {
      console.log('error', error);
      history.push('/home');
    });
  };

  return (
    <div className="flex justify-center items-center w-full flex-col py-4 min-h-screen bg-black">

      <div className="p-8 flex flex-col items-center">
        <div className="ajs-header text-center text-6xl leading-loose text-white font-bungee font-bold">
                AJ’s Experience
        </div>
      </div>

      <div className="mt-72 lg:mt-2 xl:mt-2 box-border form-box-shadow mix-blend-normal rounded-3xl border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4 bg-black">
        <form onSubmit={handleSubmit}
          method="POST"
        >
          <div className="mb-4 mt-4">
            <div className="mb-4 mt-2">
              <label className="block text-white text-2xl mb-10 mt-10 text-center font-inter" htmlFor="username">
                            Application
              </label>
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name"
              className={`bg-black text-white placeholder-italic appearance-none border-b-2 md:border-b-2 border-gray-200 border-opacity-25 font-inter rounded w-full py-1 px-3 ${name.error ? 'border-red-500' : ''}`}
              required
              {...name.bind} />
          </div>

          <div className="mb-10 mt-10 flex justify-end">
            <button className="border rounded-2xl px-3 py-2 text-white font-inter bg-black w-20 font-bold">
                        Go
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Application;
