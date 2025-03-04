import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { deleteField, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"

export default function Watchlist(props){
    const { globalUser, globalData, setGlobalData } = useAuth()
    const [isShowMore, setIsShowMore] = useState(false)

    async function deleteWatchlistItem(movieID){


        const copy = {...globalData}
        delete copy[movieID]
        setGlobalData(copy)

        // Then update Firebase
        const userRef = doc(db, 'users', globalUser.uid);
        await updateDoc(userRef, 
            {
            [movieID]: deleteField()
        });




    }


    const updatedWatchlistArray = isShowMore ? Object.entries(globalData) : Object.entries(globalData).slice(0,3)
    const watchlistLength = Object.keys(globalData).length

    return(
        <>
            <div className="flex justify-center mb-10">
                <h2 className="text-2xl font-bold border-b-1 pb-2 border-[#323c71]">My Watchlist</h2>
            </div>


            {Object.keys(globalData).length > 0 ? (
                <>
                    <div className="flex flex-col gap-10 min-w-15">
                        {updatedWatchlistArray.map(([movieID, movie]) => (
                            <div
                            key={movieID}
                            className="bg-[#1a1e32] rounded-2xl grid grid-cols-[auto_1fr_auto] items-center p-4 gap-4 shadow-lg"
                            >
                                {/* Movie Poster */}
                                <img
                                    className="w-28 h-auto rounded-2xl object-cover"
                                    src={movie.Poster}
                                    alt={movie.Title}
                                />

                                {/* Movie Details */}
                                <div className="flex flex-col gap-2">
                                    <p className="font-bold text-lg text-white">{movie.Title}</p>
                                    <div className="flex gap-3 items-center">
                                    <p className="text-yellow-300 font-medium">{movie.Year}</p>
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-2xl text-sm font-medium">
                                        {movie.Type}
                                    </span>
                                    </div>
                                    <p className="text-gray-400 text-sm">IMDB-ID: {movie.imdbID}</p>
                                </div>

                                {/* Delete Button */}
                                <button
                                    className="text-red-500 text-2xl hover:text-red-400 transition-all"
                                    onClick={() => deleteWatchlistItem(movieID)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>

                     {watchlistLength > 3 &&(              
                        <button 
                            className=" mt-5 gap-2 p-2 rounded-2xl cursor-pointer bg-[#070A21] text-white border border-[#2E3561] hover:bg-[#111436] transition-colors" 
                            onClick={()=> setIsShowMore(!isShowMore)}
                        >

                            {isShowMore ? "Show less" : `Show ${watchlistLength-3} more`}
                        </button>)}
                </>

            ) : (
                <p>Your watchlist is empty!</p>
            )}
        </>
    )
}