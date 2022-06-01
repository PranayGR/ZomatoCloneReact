import React from 'react';
import {Link} from 'react-router-dom';

const ListingDisplay = (props) =>{

    // To shwo MealTypes Badges on Listing Card
    const showMeal = (mealtype) =>{
        if(mealtype){
            return mealtype.map((item) =>{
                return(
                    <span className="badge rounded-pill bg-warning text-dark ms-3" key={item.mealtype_id}>{item.mealtype_name}</span>
                )
            })
        }
    }

    // To shwo Cuisine Badges on Listing Card
    const showCuisine = (cuisine) =>{
        if(cuisine){
            return cuisine.map((item) =>{
                return(
                    <span className="badge rounded-pill bg-success ms-3" key={item.cuisine_id}>{item.cuisine_name}</span>
                )
            })
        }
    }


    // To show Listing Card in Listing page
    const renderData = ({listData}) =>{
        if(listData){
            if(listData.length > 0){
                return listData.map((item) =>{
                    return(
                        <div className="FoodCard" key={item.restuarant_id}>
                            <div className="FoodImage">
                                <img src={item.RestuarantImg} alt={item.restuarantName}/>
                            </div>
                            <div className="FoodDescription">
                                <Link to={`/details?restId=${item.restuarant_id}`} style={{ textDecoration: 'none', textTransform: 'uppercase' }}><h3>{item.restuarantName}</h3></Link>
                                <p><i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp; {item.location}</p>
                                {showMeal(item.MealTypes)}
                                <p>{showCuisine(item.Cuisines)}</p>
                                <p>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half" style={{fontSize: '12px'}}></i>
                                    &nbsp; &nbsp; &nbsp;
                                    <span className="restRating">{item.rating}</span>
                                </p>
                                <p className="foodprice1">Price: <span style={{color: 'black', fontWeight: 'bold' }}>&#8377;{item.cost}</span> <span style={{fontSize: '12px'}}>per 2 Persons</span></p>
                            </div>
                            <div className="clear"></div>
                        </div>
                    )
                })
            } else{
                return (
                    <h2 className="text-center my-5">Oops!! No Restuarants To Show</h2>
                )
            }
        } else{
            return(
                <>
                    <img src="/loading.gif" alt="Loading"/>
                </>
            )
        }
    }


    return(
        <>
            {renderData(props)}
        </>
    )
}

export default ListingDisplay;