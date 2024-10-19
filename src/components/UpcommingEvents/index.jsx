import { useState,useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

import Loader from 'react-loader-spinner'
import {v4 as uuidv4} from 'uuid'
import UpcommingEventsItem from '../UpcommingEventsItem'

import './index.css'


const apiStatusConstants = {
    initial : 'INITIAL',
    loading : 'LOADING',
    success : 'SUCCESS',
    failure : 'FAILURE'
}

const UpcommingEvents = () => {
    const [apiResponse, setApiResponse] = useState({
        status : apiStatusConstants.initial,
        data : null,
        errorMsg: null
    })

    useEffect(() => {
        const getRecommendedData = async () => {
            setApiResponse({
                status: apiStatusConstants.loading,
                data: null,
                errorMsg: null
            })
            const url = 'https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=1&type=upcoming';
            const response = await fetch(url)
            const data = await response.json()
            if (response.ok) {
                const formattedData = data.events.map(each => ({
                    id: uuidv4(),
                    eventName: each.eventName,
                    cityName: each.cityName,
                    date: each.date,
                    weather: each.weather,
                    distanceKm: each.distanceKm,
                    imageUrl: each.imgUrl
                }))
                
                setApiResponse({
                    status: apiStatusConstants.success,
                    data: formattedData,
                    errorMsg: null
                })
            }
            else {
                setApiResponse({
                    status: apiStatusConstants.failure,
                    data: null,
                    errorMsg: "Error Loading..."
                })
            }
        }
        getRecommendedData();
    }, [])
    const getView = () => {
        switch(apiResponse.status) {
            case (apiStatusConstants.loading) :
                return loadingView()
            case (apiStatusConstants.success) :
                return successView()
            case (apiStatusConstants.failure) :
                return failureView()
            default :
                return
        }
    }
    
    const loadingView = () => (
        <div className="loader-con">
            <Loader type="ThreeDots" color="#CF2D2D" height={50} width={50} />
        </div>
    )

    const failureView = () => (
        <h1>Loading Error.....</h1>
    )

    const successView = () => (
        <ul className="upcom-ul">
            {apiResponse.data.map(each => (
                <UpcommingEventsItem itemDetails={each} key={each.id}/>
            ))
            }            
        </ul>
    )

    return (
        <div className="recom-con">
            <div className="recom-head-con">
                <h1 className="recom-head">Upcomming Events</h1>  
                <FaArrowRightLong className="recom-head-logo"/>
            </div>  
            {getView()}
        </div>
        
    )
}

export default UpcommingEvents