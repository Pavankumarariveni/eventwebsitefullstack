import { IoLocationOutline } from "react-icons/io5";

import './index.css'
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const UpcommingEventsItem = props => {
    const {itemDetails} = props
    const {eventName,cityName,date,weather,distanceKm,imageUrl} = itemDetails
    const conDate = new Date(date)
    const month = months[conDate.getMonth()];
    const day = conDate.getDay() + 1
    const year = conDate.getFullYear()
    const distance = Math.round(distanceKm / 100)
    const imgPath = imageUrl.substring(32,imageUrl.length-5);
    const img = `https://lh3.googleusercontent.com/d/${imgPath}=s220?authuser=0`
    let Name;
    if (eventName.length < 12) {
        Name = eventName.slice(0,12)
    }
    else if (eventName.length > 12) {
        Name = eventName.slice(0,12) + "...."
    }
    return (
        <li style={{backgroundImage: `url(${img})`}} className="rec-item-con">
            <div className='rec-item-1'>
                <p className="rec-item-name">{Name}</p>
                <p className='rec-item-date'>{month} {day} , {year}</p>
            </div>
            <div className='rec-item-2'>
                <div className="location-item-con">
                    <IoLocationOutline className="loc-logo"/>
                    <p>{cityName}</p>
                </div>
                <div className="upcom-item-wd">
                    <p className="weather">{weather}</p>
                    <p>{distance}KM</p>
                </div>
            </div>            
        </li>
    )
}
export default UpcommingEventsItem