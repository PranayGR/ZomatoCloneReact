import React, { Component } from 'react';

const CuisineFilterURL = "https://zomatoapiclone.herokuapp.com/filter"

class CuisineFilter extends Component {
    constructor(props) {
        super(props);

    }

    filterCuisine = (event) => {
        let cuisineId = event.target.value;
        let mealId = this.props.mealId;
        let cuisineURL = "";
        let skipValue = this.props.pageValue.skip;
        let limitValue = this.props.pageValue.limit;
        if (cuisineId === "") {
            cuisineURL = `${CuisineFilterURL}/${mealId}`;
        } else if(cuisineId){
            cuisineURL = `${CuisineFilterURL}/${mealId}?cuisine=${cuisineId}`;
        }

        fetch(cuisineURL, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                this.props.restPerCuisine(data);
            })
    }

    render() {
        return (
            <>
                
                <div onChange={this.filterCuisine} className="cuisineFilter">
                    <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '18px'}}>Cuisines</p>
                    <div className="me-lg-0 me-2 applyFloat">
                        <input type="radio" id="NorthIndian" name="cuisine" value="1" />
                        <label htmlFor="NorthIndian">North Indian</label><br />
                        <input type="radio" id="SouthIndian" name="cuisine" value="2" />
                        <label htmlFor="SouthIndian">South Indian</label><br />
                        <input type="radio" id="Bengali" name="cuisine" value="3" />
                        <label htmlFor="Bengali">Bengali</label><br />
                        <input type="radio" id="chinese" name="cuisine" value="4" />
                        <label htmlFor="chinese">Chinese</label><br />
                    </div>
                    <div className="me-lg-0 me-2 applyFloat">
                        <input type="radio" id="American" name="cuisine" value="5" />
                        <label htmlFor="American">American</label><br />
                        <input type="radio" id="Italian" name="cuisine" value="6" />
                        <label htmlFor="Italian">Italian</label><br />
                        <input type="radio" id="Continental" name="cuisine" value="7" />
                        <label htmlFor="Continental">Continental</label><br />
                        <input type="radio" id="Korean" name="cuisine" value="8" />
                        <label htmlFor="Korean">Korean</label><br />
                    </div>
                    <div className="me-lg-0 me-2 applyFloat">
                        <input type="radio" id="Asian" name="cuisine" value="9" />
                        <label htmlFor="Asian">Asian</label><br />
                        <input type="radio" id="fastfood" name="cuisine" value="10" />
                        <label htmlFor="fastfood">Fast Food</label><br />
                    </div>
                    <div className="clear"></div>
                </div>
            </>
        )
    }

}

export default CuisineFilter;