import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import "./SearchPage.css"
import { useDeboune } from '../../hooks/useDebounce';

export default function SearchPage() {

    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);

    console.log('useLocation()', useLocation());
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get("q");
    const debounceSearchTerm = useDeboune(searchTerm, 500);
    console.log('searchTerm', searchTerm)

    useEffect(() => {
        if (debounceSearchTerm) {
            fetchSearchMovie(searchTerm);
        }
    }, [debounceSearchTerm]);

    const fetchSearchMovie = async (searchTerm) => {
        console.log('searchTerm', searchTerm)
        try {
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${searchTerm}`
            );
            console.log(request);
            setSearchResults(request.data.results);
        } catch (error) {
            console.log("error", error)
        }
    }

    const renderSearchResult = () => {
        return searchResults.length > 0 ? (
            <section className='search-container'>
                {searchResults.map((movie) => {
                    if(movie.backdrop_path !== null && movie.media_type !== "person") {
                        const movieImageUrl = 
                        "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
                        return (
                            <div className='movie' key={movie.id}>
                                <div onClick={() => navigate(`/${movie.id}`)}
                                className='movie__column-poster'
                                >
                                    <img
                                        src={movieImageUrl} alt='movie'
                                        className='movie__poster'
                                    />
                                </div>
                            </div>
                        )
                    }
                })}
            </section>
        ) : 
        <section className='no-results'>
            <div className='no-results__text'>
                <p>찾고자 하는 검색어 "{debounceSearchTerm}"에 맞는 영화가 없습니다.</p>
            </div>

        </section>
    }

    return renderSearchResult();
}
