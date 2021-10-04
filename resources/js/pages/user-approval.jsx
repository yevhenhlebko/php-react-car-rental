import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { getUsers } from "../api/auth";
import { setUserAction } from "../api/user-approve";

function UserApproval() {
  const [actionChanged, setActionChanged] = useState(false);
  const [currentUsers, setCurrentUsers] = useState([]);

  const userAction = (action, id) => {
    setUserAction({
      action,
      id,
    })
      .then((status) => {
        setActionChanged(!actionChanged);
        // eslint-disable-next-line handle-callback-err
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getUsers().then((users) => {
      setCurrentUsers(users);
    });
  }, [actionChanged]);

  return (
    <div className="flex justify-center items-center w-full flex-col py-4 min-h-screen bg-black">
      <div className="p-8 flex flex-col items-center">
        <div className="ajs-header text-center text-4xl sm:text-6xl leading-loose text-white font-bungee font-bold">
          AJ’s Experience
        </div>
      </div>

      <div className="mt-3 box-border overflow-hidden text-xl form-box-shadow mix-blend-normal rounded-3xl border-grey-light w-3/4 sm:w-5/6 lg:w-11/12 xl:w-4/5 px-8 py-4 bg-black">
        <div className="mb-10 mt-4 text-right">
          <Link
            to="/create-user"
            className="border right rounded-2xl px-3 py-2 text-white font-inter bg-black w-30 font-bold inline-block"
          >
            Create GoCode User
          </Link>
        </div>
        <div className="overflow-auto lg:overflow-visible mb-4 mt-4">
          <div className="card-body bg-black text-white appearance-none  font-inter rounded w-full py-1 px-3">
            <table>
              <thead>
                <tr className="w-full text-center">
                  <th>ID</th>
                  <th className="w-1/5">Name</th>
                  <th className="w-2/5">Email</th>
                  <th className="w-1/5">Go Code</th>
                  <th>Status</th>
                  <th className="w-1/5">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers ? (
                  currentUsers.map((user, index) => (
                    <tr key={index} className="w-full text-center">
                      <td className="px-3">{user.id}</td>
                      <td className="w-1/5 px-3">{user.name}</td>
                      <td className="px-3">{user.email}</td>
                      <td className="px-3">{user.go_code || "-"}</td>
                      <td className="px-3">
                        {user.ready_review == "1" ? "Accepted" : user.ready_review == "0" ? "Pending" : "Rejected"}
                      </td>
                      <td className="px-3">
                        <div className="flex">
                          <p className="flex flex-col px-4 py-4 m-auto" onClick={() => userAction("accept", user.id)}>
                            <Link
                              to="#"
                              className="border rounded-2xl px-3 py-2 text-white font-inter bg-black w-30 font-bold"
                            >
                              Accept
                            </Link>
                          </p>

                          {!user.go_code && (
                            <p className="flex flex-col px-4 py-4 m-auto" onClick={() => userAction("reject", user.id)}>
                              <Link
                                to="#"
                                className="border rounded-2xl px-3 py-2 text-white font-inter bg-black w-30 font-bold"
                              >
                                Reject
                              </Link>
                            </p>
                          )}

                          <p className="flex flex-col px-4 py-4 m-auto" onClick={() => userAction("delete", user.id)}>
                            <Link
                              to="#"
                              className="border rounded-2xl px-3 py-2 text-white font-inter bg-black w-30 font-bold"
                            >
                              Delete
                            </Link>
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p className="text-center">Loading...</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserApproval;
