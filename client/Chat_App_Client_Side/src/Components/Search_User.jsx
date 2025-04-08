import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import Loading_Spinner from './Loading_Spinner';
import UserSearchCard from './UserSearchCard';
import toast from 'react-hot-toast';
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import { useSelector } from 'react-redux';
const url = import.meta.env.VITE_BACKEND_URL;

const Search_User = ({ onClose }) => {


    const [SearchUser, SetSearchUser] = useState([]);

    const [loading, Setloading] = useState(false);

    const [searchInput, Set_SearchInput] = useState("");

    const darkMode = useSelector(state=>state?.user?.darkMode);

    const Handle_SearchUser = async () => {
        const URL = `${url}/searchUser`
        try {
            Setloading(true);
            const response = await axios.post(URL, {
                search: searchInput
            })
            Setloading(false);

            SetSearchUser(response?.data?.data);

        } catch (error) {
            toast.error(error?.message);

        }
    }

    useEffect(() => {
        Handle_SearchUser()
    }, [searchInput])


    return (
        <div className='fixed top-0 bottom-0 right-0 left-0 bg-slate-700 bg-opacity-40 p-2 z-10'>

            <div className='w-full max-w-md mx-auto mt-10'>

                {/* Input search user  */}
                <div className={`rounded h-14 overflow-hidden flex ${darkMode?"bg-gray-500 text-white":"bg-white"}`}>
                    <input
                        type="text"
                        placeholder='Search user by name, email...'
                        onChange={(e) => { Set_SearchInput(e.target.value) }}
                        value={searchInput}
                        className={`w-full outline-none py-1 h-full px-4 ${darkMode?"bg-gray-500 text-white":"bg-white"}`}
                    />
                    {/* Searchicon  */}
                    <div className='h-14 w-14 flex justify-center items-center cursor-pointer'>
                        <IoSearchOutline size={25} />
                    </div>
                </div>

                {/* Display Search user  */}
                <div className={`mt-2 w-full p-4 rounded max-h-96  overflow-x-hidden overflow-y-scroll  ${darkMode?"bg-gray-500 text-white Scrollbar":"bg-white scrollbar"}`}>
                    {/* If no user found */}
                    {SearchUser.length === 0 && !loading && (<p className='text-center text-slate-500'>No user found!</p>)}

                    {/* //Loading  */}
                    {
                        loading && (
                            <p><Loading_Spinner darkMode={darkMode} /></p>
                        )
                    }
                    {/* users are available  */}
                    {
                        SearchUser.length !== 0 && !loading && (
                            SearchUser.map((user, index) => {
                                return (
                                    <div className=''>
                                        <UserSearchCard key={user._id} user={user} onClose={onClose} darkMode = {darkMode}/>

                                    </div>



                                )
                            })
                        )
                    }
                </div>
            </div>
            <div className={`absolute top-0 right-0 text-2xl p-2 lg:text-4xl ${darkMode?"text-white hover:text-red-500":"text-red-500 hover:text-red-600"} `} onClick={onClose}>
                <button>
                    <IoClose/>
                </button>
            </div>
        </div>
    );
}

export default Search_User;
