import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import CategoriesSection from '../CategoriesSection'
import Navbar from '../Navbar'
import RecommendedShows from '../RecommendedShows'
import UpcommingEvents from '../UpcommingEvents'
import './index.css'

const Home = () => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
        return <Navigate to="/login" />
    }
    return (
        <>
            <Navbar/>
            <CategoriesSection/>
            <div className='home-con'>
                <div className='home-des'>
                    <h1 className='home-con-head'>Discover Exciting Events Happening
                        Near You - Stay Tuned for Updates!
                    </h1>
                    <p className='home-con-para'>Dorem ipsum dolor sit amet, consectetur adipiscing elit. Cras neque justo, condimentum placerat ornare et, feugiat quis elit. Etiam id ex non ipsum porttitor facilisis eget eget eros.</p>
                </div>
            </div>
            <RecommendedShows/>
            <UpcommingEvents/>
            
        </>
    )
}

export default Home