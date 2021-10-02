import React, { useEffect, useState } from 'react';

import { getUsers } from '../api/auth';
import { setUserAction } from '../api/user-approve';
import { Link } from 'react-router-dom';

function UserApproval () {
  const [actionChanged, setActionChanged] = useState(false);
  const [currentUsers, setCurrentUsers] = useState([]);

  const userAction = (action, id) => {
    setUserAction({
      action: action,
      id: id
    }).then(status => {
      setActionChanged(!actionChanged);
    // eslint-disable-next-line handle-callback-err
    }).catch(error => {
    });
  };
  useEffect(() => {
    getUsers().then((users) => {
      setCurrentUsers(users);
    });
  }, [actionChanged]);

  return (
    <div className="flex justify-center items-center w-full flex-col py-4 min-h-screen bg-black">

      <div className="p-8 flex flex-col items-center">
        <div className="ajs-header text-center text-6xl leading-loose text-white font-bungee font-bold">
            AJ’s Experience
        </div>
      </div>

      <div className="mt-72 lg:mt-2 xl:mt-2 box-border overflow-hidden text-2xl form-box-shadow mix-blend-normal rounded-3xl border-grey-light w-3/4 sm:w-1/2 lg:w-3/5 xl:w-3/5 px-8 py-4 bg-black">
        <div className="overflow-auto mb-4 mt-4">
          <div className="card-body bg-black text-white appearance-none  font-inter rounded w-full py-1 px-3">
            <table>
              <thead>
                <tr className="w-full text-center">
                  <th>ID</th>
                  <th className='w-1/5'>Name</th>
                  <th className='w-2/5'>Email</th>
                  <th>Status</th>
                  <th className='w-1/5'>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentUsers
                    ? currentUsers.map((user, index) => (
                      <tr key={index} className="w-full text-center" >
                        <td>{user.id}</td>
                        <td className='w-1/5'>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.ready_review == '1' ? 'Accepted' : 'Rejected'}</td>
                        <td>
                          <div className="flex">
                            <p className="flex flex-col px-4 py-4 m-auto"
                              onClick={() => userAction('accept', user.id)}
                            >
                              <Link
                                to="#"
                                className="border rounded-2xl px-3 py-2 text-white font-inter bg-black w-30 font-bold">
                                                                Accept</Link>
                            </p>
                            <p className="flex flex-col px-4 py-4 m-auto"
                              onClick={() => userAction('reject', user.id)}
                            >
                              <Link
                                to="#"
                                className="border rounded-2xl px-3 py-2 text-white font-inter bg-black w-30 font-bold">
                                                                Reject</Link>
                            </p>
                            <p className="flex flex-col px-4 py-4 m-auto"
                              onClick={() => userAction('delete', user.id)}
                            >
                              <Link
                                to="#"
                                className="border rounded-2xl px-3 py-2 text-white font-inter bg-black w-30 font-bold">
                                                                Delete</Link>
                            </p>
                          </div>
                        </td>
                      </tr>
                    )) : 'Loading...'
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserApproval;