import React from 'react'
import LastMovieInDb from '../components/LastMovieInDb'
import GenresInDb from '../components/GenresInDb'
import ContentRowMovies from '../components/ContentRowMovies'

export default function ContentRowTop() {
    return (
        <>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">DHTravel Dashboard</h1>
                </div>
            </div>
            <div className="row">
                <ContentRowMovies />
            </div>
            <div className="row">
        <LastMovieInDb />
        <GenresInDb />
        </div>

        </>

    )
}
