import React from 'react';
import Avater from './Avater';
import { Link } from 'react-router-dom';

const UserSearchCard = ({user,onClose,darkMode}) => {


  return (
      <Link
        to={'/' + user._id}
        onClick={onClose}
        className={`flex items-center gap-3 p-2 lg:p-4  rounded cursor-pointer ${darkMode?"hover:bg-gray-600":"hover:bg-slate-200"}`}
      >
        <div>
          <Avater
            width={50}
            height={50}
            name={user?.name}
            imageUrl={user?.profile_pic}
            userId = {user?._id}
          />
        </div>
        <div>
          <div className="font-semibold text-ellipsis line-clamp-1">
            {user?.name}
          </div>
          <p className="text-sm text-ellipsis line-clamp-1">{user?.email}</p>
        </div>
      </Link>
 
  
  );
}

export default UserSearchCard;
