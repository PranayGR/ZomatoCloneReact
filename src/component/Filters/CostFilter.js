import React,{Component} from 'react';

const CostFilterURL = "https://zomatoapiclone.herokuapp.com/filter"

class CostFilter extends Component{

    filterCost = (event) => {
        let cost = (event.target.value).split("-");
        let lcost = cost[0];
        let hcost = cost[1];
        let mealId = this.props.mealId;
        let costURL = "";
        if(event.target.value === ""){
            costURL = `${CostFilterURL}/${mealId}`;
        } else{
            costURL = `${CostFilterURL}/${mealId}?lcost=${lcost}&hcost=${hcost}`;
        }

        fetch(costURL, {method: 'GET'})
        .then((res) => res.json())
        .then((data) =>{
            this.props.restPerCost(data);
        })
    }

    render() {
        return(
            <>
                
                <div  onChange={this.filterCost} className="costFilter">
                    <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '18px'}}>Cost Filter</p>
                    <label className="radio me-2">
                        <input type="radio" name="cost" value="100-300"/>100-300
                    </label>
                    <label className="radio me-2">
                        <input type="radio" name="cost" value="300-500"/>300-500
                    </label>
                    <label className="radio me-2">
                        <input type="radio" name="cost" value="500-700"/>500-700
                    </label>
                    <label className="radio me-2">
                        <input type="radio" name="cost" value="700-900"/>700-900
                    </label>
                    <label className="radio me-2">
                        <input type="radio" name="cost" value="700-900"/>700-900
                    </label>
                    <label className="radio me-2">
                        <input type="radio" name="cost" value="900-1100"/>900-1100
                    </label>
                </div>
            </>
        )
    }
    
}

export default CostFilter;