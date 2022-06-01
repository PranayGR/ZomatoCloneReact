import React from 'react';
import {Link} from 'react-router-dom';
import './QuickSearch.css';

const QuickDisplay = (props) => {

    // To show Quicksearch Card
    const listMeal = ({mealData}) =>{
        if(mealData){
            return mealData.map((item) => {
                return (
                    <div className="col-md-4 mt-5" key={item._id}>
                        <Link to={`/listing/${item._id}`}>
                            <div className="card mx-auto p-0">
                                <img src={item.meal_image} alt={item.type}/>
                                <div className="card-body">
                                    {item.type}
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })
        }
    }

    return(
        <>
            <div className="row user-select-none">
                {listMeal(props)}
            </div>
        </>
    )
}

export default QuickDisplay;