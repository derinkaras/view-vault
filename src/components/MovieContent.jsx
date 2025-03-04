import { useState } from "react";
import ContentList from "./ContentList";
import useMovieSearch from "../contexts/useMovieSearch";

export default function MovieContent(props) {
    const [search, setSearch] = useState("");
    const [movieQuery, setMovieQuery] = useState(null);
    const { data, loading, error, setError } = useMovieSearch(movieQuery);

    const {isMovies} = props

    return (
        <>
            <div className="mt-5 text-center text-2xl font-medium mb-5"> 
                <p>Search for a movie</p> 
            </div>

            <div className="mb-5 flex justify-center relative">
                <input 
                    className="ring rounded-md ring-[#4649af] focus:outline-none focus:ring focus:ring-[#4649af] py-2 px-2"
                    type="text" 
                    placeholder="e.g Star Wars" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button 
                    className="relative hover:cursor-pointer p-5 ml-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-md transition-colors duration-200 flex items-center justify-center" 
                    onClick={() => { setMovieQuery(search); setError(false); }}
                >
                    <i className="fa-solid fa-magnifying-glass absolute"></i>
                </button>
            </div>

            {error && (
                <p className="text-center text-red-500 font-bold mb-5">{error.message} Try again and review your search</p> 
            )}

            {!error && data && loading && (
                <p className="text-center mb-5">Loading...</p>
            )}

            <ContentList data={data} isMovies = {isMovies} />
        </>
    );
}
