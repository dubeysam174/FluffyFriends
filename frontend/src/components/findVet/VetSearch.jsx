import React, { useState } from 'react'
import { Search,MapPin,Star } from 'lucide-react'

const VetSearch = () => {
    const [searchTerm,setSearchTerm]=useState("");
    const [sortBy,setSortBy]=useState('distance')
    const [minRating,setMinRating]=useState(0)


    const handleSearch=(e)=>{
        e.preventDefault();
        onSearch(searchTerm)
    }

    const handleFilter=()=>{
        onFilter({
            sortBy,
            minRating,
        })
    }
  return (
    <div className='bg-white rounded-2xl shadow-lg p-6 mb-6'>
        {/* search bar */}
        <form onSubmit={handleSearch} className='mb-6'>
            <div className='relative flex items-center'>
                <Search size={20} className='absolute left-4 text-gray-400'/>

                <input type="text"
                       value={searchTerm}
                       onChange={(e)=> setSearchTerm(e.target.value)}
                       placeholder='Search by vet name or specialization...'
                       className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 transition'
         
                        />
                        <button
                         type='submit'
                         disabled={loading}
                         className='absolute right-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50'
                        >
                            {loading? "Searching...": "Search"}
                        </button>
            </div>
        </form>

        {/* filter */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* sort by */}
            <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Sort By
                </label>
                <select 
                 value={sortBy}
                 onChange={(e)=> setSortBy(e.target.value)}
                 className='w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition' 
                  >
                    <option value="distance">Distance</option>
                    <option value="rating">Rating</option>
                    <option value="experience">Experience</option>
                    <option value="name">Name A-Z</option>
                  </select>
            </div>
            {/* minimum rating */}
            <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Minimum Rating
                </label>
             <div className='flex items-center gap-2'>
                 <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="flex items-center gap-1 text-sm font-semibold text-gray-700 whitespace-nowrap">
              <Star size={16} className="text-yellow-500" />
              {minRating}+
            </span>
                </div>   
            </div>
            {/* apply filters */}
            <div className='flex items-end'>
                <button
                onClick={handleFilter}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-semibold'
                >
                    Apply Filters
                </button>
            </div>
        </div>
      
    </div>
  )
}

export default VetSearch;
