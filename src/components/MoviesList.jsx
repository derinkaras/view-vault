import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Import required modules
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import Watchlist from './WatchList';
import ImageCarousel from './ui/ImageCarousel';
import { useAuth } from '../contexts/AuthContext';
import Modal from './Modal';
import Authentication from './Authentication';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { baseCarousel } from '../../utils';


export default function MoviesList(props) {
    const { data } = props
    const [selectedCards, setSelectedCards] = useState({})
    const { globalData, setGlobalData } = useAuth()
    const [ showModal, setShowModal ] = useState(false)
    const { globalUser } = useAuth()




    function toggleCardSelection(movieID){
        setSelectedCards(prev => ({ //This using a useState setter and the prev param with the arrow function allows you to spread whatever the previous use state var was into the data type which matches it 
            ...prev,
            [movieID]: !prev[movieID] // False or doesnt exist will be made true and true will be made false based on the toggle
        }))
    }

    const addToWatchlist = async (e, movie) => {
        // stopPropagation() prevents the click from also triggering the parent card's
        // onClick handler. Without this, clicking the button would both add to watchlist
        // AND toggle the card selection state (immediately hiding the overlay).

        if(!globalUser){
            setShowModal(true)
        }
        else{
            // Local global data update
            setGlobalData(prev => ({
                ...prev,
                [movie.imdbID]: movie 
            }))

            // Firebase global data update
            const userRef = doc(db, 'users', globalUser.uid)
            await setDoc(userRef, {
                [movie.imdbID]: movie 
            }, {merge: true});
        

        }
    }

    useEffect(()=>{
        console.log("CURRENT WATCHLIST: ", globalData)
    }, [globalData])

    function handleCloseModal(){
        setShowModal(false)
    }

    return (
        <>
           

            {showModal && (
                <Modal handleCloseModal = {handleCloseModal}>
                    <Authentication handleCloseModal = {handleCloseModal}/>
                </Modal>
            )}

            {!data && (
                <>  
                    <div className='my-20'>
                        <ImageCarousel data = {baseCarousel} />
                    </div>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 place-items-center mb-10">
                        {baseCarousel.map((movie, index) => (
                            <div key={index} className="relative group">
                            {/* Movie Card - Click to Select */}
                                <div
                                    className="flex flex-col items-center rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 cursor-pointer border border-transparent hover:border-[#4649af]"
                                    onClick={() => toggleCardSelection(movie.imdbID)}
                                >
                                    {/* Movie Poster */}
                                    <div className="h-60 w-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                    <img
                                        className="h-full w-full object-contain"
                                        src={movie.Poster}
                                        alt={movie.Title || "movie"}
                                    />
                                    </div>

                                    {/* Movie Title */}
                                    <p className="w-40 text-center text-sm mt-2 font-medium text-gray-800 dark:text-gray-200 truncate">
                                    {movie.Title}
                                    </p>

                                    {/* Overlay for Selection */}
                                    {selectedCards[movie.imdbID] && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#121424] opacity-90 transition-opacity duration-300">
                                        {/* Add to Watchlist Button */}
                                        <button
                                        className="bg-white dark:bg-[#05070f] text-black dark:text-white font-medium px-4 py-2 border border-[#bed1e7] dark:border-[#323c71] rounded-md shadow-md transition-all duration-200 transform hover:translate-y-1 hover:shadow-none"
                                        onClick={(e) => {
                                            
                                            addToWatchlist(e, movie);
                                        }}
                                        >
                                        Add to Watchlist
                                        </button>
                                    </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>

            )}

            {data?.length > 0 && (
                <>  

                    <div className='my-20'>
                        <ImageCarousel data = {data} />
                    </div>

                    {/* Heading Section */}
                    <div className="flex justify-center items-center gap-3 text-3xl mb-10">
                    <p className="text-2xl font-bold border-b border-[#4649af] pb-5">
                        Click to Add to your Watchlist
                    </p>
                    </div>

                    {/* Movie Grid */}
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 place-items-center mb-10">
                        {data.map((movie, index) => (
                            <div key={index} className="relative group">
                            {/* Movie Card - Click to Select */}
                                <div
                                    className="flex flex-col items-center rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 cursor-pointer border border-transparent hover:border-[#4649af]"
                                    onClick={() => toggleCardSelection(movie.imdbID)}
                                >
                                    {/* Movie Poster */}
                                    <div className="h-60 w-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                    <img
                                        className="h-full w-full object-contain"
                                        src={movie.Poster}
                                        alt={movie.Title || "movie"}
                                    />
                                    </div>

                                    {/* Movie Title */}
                                    <p className="w-40 text-center text-sm mt-2 font-medium text-gray-800 dark:text-gray-200 truncate">
                                    {movie.Title}
                                    </p>

                                    {/* Overlay for Selection */}
                                    {selectedCards[movie.imdbID] && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#121424] opacity-90 transition-opacity duration-300">
                                        {/* Add to Watchlist Button */}
                                        <button
                                        className="bg-white dark:bg-[#05070f] text-black dark:text-white font-medium px-4 py-2 border border-[#bed1e7] dark:border-[#323c71] rounded-md shadow-md transition-all duration-200 transform hover:translate-y-1 hover:shadow-none"
                                        onClick={(e) => {
                                            
                                            addToWatchlist(e, movie);
                                        }}
                                        >
                                        Add to Watchlist
                                        </button>
                                    </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}




            {globalData && (
                <Watchlist/>
            )}


        </>
    );
}