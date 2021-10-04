import React from "react";
import { Link, useHistory } from "react-router-dom";
import { BiLockAlt } from "react-icons/bi";
import { useAuth } from "../../context/auth";
import useInputValue from "../../components/input-value";
import GuestNav from "../../components/guest-nav";

function CreateUser() {
  const history = useHistory();
  const { registerGoCodeUser } = useAuth();
  const name = useInputValue("name");
  const handleSubmit = (e) => {
    e.preventDefault();

    registerGoCodeUser({
      name: name.value,
    })
      .then(() => {
        history.push("/user-approve");
      })
      .catch((error) => {
        error.json().then(({ errors }) => {
          [name, gocode].forEach(({ parseServerError }) => parseServerError(errors));
        });
      });
  };

  return (
    <>
      <div className="flex justify-center items-center w-full flex-col py-4 min-h-screen bg-black">
        <div className="p-8 flex flex-col items-center">
          <div className="ajs-header text-center text-6xl leading-loose text-white font-bungee font-bold">
            <img src="/images/icons/ajexperience.svg" />
          </div>
        </div>

        <div className="mt-72 lg:mt-2 xl:mt-2 box-border form-box-shadow mix-blend-normal rounded-3xl border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4 bg-black">
          <form onSubmit={handleSubmit} method="POST">
            <div className="mb-4 mt-4">
              <div className="mb-4 mt-2">
                <label className="block text-white text-2xl mb-10 mt-10 text-center font-inter" htmlFor="username">
                  Add a name to generate a unique go code
                </label>
              </div>
            </div>

            <div className="mb-4">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="name"
                className={`bg-black text-white appearance-none border-b-2 md:border-b-2 border-gray-200 border-opacity-25 font-inter rounded w-full py-1 px-3   ${
                  name.error ? "border-red-500" : ""
                }`}
                required
                {...name.bind}
              />
              <BiLockAlt className="text-white fa-icon inline" />
              {name.error && <p className="text-red-500 text-xs pt-2">{name.error}</p>}
            </div>

            <div className="mb-4">
              {/* <input
                type="text"
                id="gocode"
                name="gocode"
                placeholder="go code (optional)"
                className={`bg-black text-white placeholder-italic appearance-none border-b-2 md:border-b-2 border-gray-200 border-opacity-25 font-inter rounded w-full py-1 px-3 ${
                  gocode.error ? "border-red-500" : ""
                }`}
                {...gocode.bind}
              /> */}
            </div>

            <div className="mb-10 mt-10 flex justify-end">
              <button className="border rounded-2xl px-3 py-2 text-white font-inter bg-black w-20 font-bold">Go</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
