import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk } from '../../store/spots';
import SpotTile from "../SpotTile"
import './AllSpots.css'

function AllSpots() {
    const spotsObj = useSelector(state => state.spot.allSpots)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotThunk())
    }, [dispatch])

    if (!spotsObj) return null
    const allSpots = Object.values(spotsObj)

    return (
        <div className='body'>
            <div className='spot-showcase'>
                {allSpots.length > 0 && allSpots.map(spots => <SpotTile spot={spots} />)}
            </div>
        </div>
    )
}

export default AllSpots
