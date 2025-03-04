import { useState } from "react";
import MovieContent from "./MovieContent";
import AnimeContent from "./AnimeContent";

export default function ContentForm() {
    const [isMovies, setIsMovie] = useState(true);

    const baseButtonStyle = "text-inherit flex items-center gap-2 hover:cursor-pointer bg-white dark:bg-[#05070f] w-fit font-medium px-2 py-2 border-[1.5px] border-[#bed1e7] dark:border-[#323c71] rounded-md transition-all duration-200";
    const inactiveButtonStyle = `${baseButtonStyle} shadow-[2px_2px_0px_0px_#bed1e7] dark:shadow-[2px_2px_0px_0px_#323c71] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]`;
    const activeButtonStyle = `${baseButtonStyle} translate-x-[2px] translate-y-[2px]`;

    return (
        <>  
            <div className="flex justify-center items-center gap-5 text-2xl font-bold mb-10">
                <button
                    className={isMovies ? activeButtonStyle : inactiveButtonStyle}
                    onClick={() => setIsMovie(true)}
                >
                    Movies
                </button>
                <button
                    className={!isMovies ? activeButtonStyle : inactiveButtonStyle}
                    onClick={() => setIsMovie(false)}
                >
                    Anime
                </button>
            </div>

            {isMovies ? <MovieContent isMovies = {isMovies} /> : <AnimeContent isMovies = {isMovies} />}
        </>
    );
}
