import React, { useState } from 'react'
import { Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : '');

  const onSearchHandler = (e) => {
    e.preventDefault();
    const query = input.trim();

    if (query) {
      navigate(`/course-list/${encodeURIComponent(query)}`);
    } else {
      navigate('/course-list');
    }
  };

  return (
    <div className="w-full flex justify-center">
 
      <form 
        onSubmit={onSearchHandler}
        className="w-full max-w-2xl h-14 flex items-center bg-white border border-gray-300 rounded-full shadow-[0_2px_25px_rgba(0,0,0,0.12)]"
      >
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Search for courses"
          className="flex-1 px-3 h-full outline-none text-gray-600 placeholder-gray-400 bg-transparent"
        />
        <div className="w-10 h-full flex items-center justify-center">
          <button type="submit">
            <Search className="text-gray-400" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar;
