import { IoLocationOutline } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa";
import './index.css'

const catList = [
    {
        id: 1,
        categorieName: "Live Shows",
    },
    {
        id: 2,
        categorieName: "Streams",
    },
    {
        id: 3,
        categorieName: "Movies",
    },
    {
        id: 4,
        categorieName: "Plays",
    },
    {
        id: 5,
        categorieName: "Events",
    },
    {
        id: 6,
        categorieName: "Sports",
    },
    {
        id: 7,
        categorieName: "Activities",
    },

]

const CategoriesSection = () => (
    <div className="cat-main-con">
        <div className="location-con">
            <IoLocationOutline className="location-icon"/>
            <h1 className="location">Mumbai, India</h1>
            <FaAngleRight className="location-arrow"/>
        </div>
        <ul className="cats-con">
            {catList.map(each => 
                (
                    <li className="cat" key={each.id}>{each.categorieName}</li>
                )
            )}
        </ul>
    </div>
)

export default CategoriesSection