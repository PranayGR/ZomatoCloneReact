import React from 'react';
import axios from 'axios';
import ListingDisplay from './ListingDisplay'
import './Listing.css';
import CuisineFilter from '../Filters/CuisineFilter';
import CostFilter from '../Filters/CostFilter';
import Header from '../Header';

const restURL = "https://zomatoapiclone.herokuapp.com/restuarants";
// let x='';
// let y='';

class Listing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurantList: '',
            skip: 0,
            limit: 5
        }
    }

    setDataPerFilter = (data) => {
        this.setState({ restaurantList: data })
    }

    changePage = (x, y, z) => {
        window.scrollTo(0, 0)
        let pageNo = document.querySelectorAll('.pageNo');
        let mealId = this.props.match.params.mealId;
        this.setState({ skip: x, limit: y });
        axios.get(`${restURL}?meal_id=${mealId}&skip=${x}&limit=${y}`)
            .then((res) => { this.setState({ restaurantList: res.data }) })

        if (pageNo[z].classList.contains('active') == false) {
            if (z == 0) {
                pageNo[z + 1].classList.remove('active');
                pageNo[z + 2].classList.remove('active');
            } else if (z == 1) {
                pageNo[z - 1].classList.remove('active');
                pageNo[z + 1].classList.remove('active');
            } else if (z == 2) {
                pageNo[z - 2].classList.remove('active');
                pageNo[z - 1].classList.remove('active');
            }
            pageNo[z].classList.add('active');
        }
    }

    render() {
        return (
            <>
                <Header />
                <div className="ListingPage">
                    <h2 style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bolder' }}><u>LISTING PAGE</u></h2>
                    <div className="list-wrapper">
                        <div className="FilterDiv">
                            <h3 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>FILTERS</h3>
                            <CuisineFilter mealId={this.props.match.params.mealId} restPerCuisine={(data) => { this.setDataPerFilter(data) }} pageValue={this.state} />
                            <CostFilter mealId={this.props.match.params.mealId} restPerCost={(data) => { this.setDataPerFilter(data) }} pageValue={this.state} />
                        </div>
                        <div className="ListDiv">
                            <ListingDisplay listData={this.state.restaurantList} />
                            <div className="d-flex justify-content-center">
                                <nav aria-label="..." className="mx-auto" style={{ cursor: 'pointer' }}>
                                    <ul className="pagination">
                                        {/* <li className="page-item disabled">
                                            <span className="page-link">Previous</span>
                                        </li> */}
                                        <li className="page-item pageNo active" onClick={() => this.changePage(0, 5, 0)}><span className="page-link">1</span></li>
                                        <li className="page-item pageNo" onClick={() => this.changePage(6, 10, 1)}>
                                            <span className="page-link">2</span>
                                        </li>
                                        <li className="page-item pageNo" onClick={() => this.changePage(11, 15, 2)}><span className="page-link">3</span></li>
                                        {/* <li className="page-item">
                                            <span className="page-link">Next</span>
                                        </li> */}
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <div className="clear"></div>

                    </div>
                </div>
            </>
        )
    }

    // Api call with axios
    componentDidMount() {
        let mealId = this.props.match.params.mealId;
        sessionStorage.setItem('mealId', mealId);
        axios.get(`${restURL}?meal_id=${mealId}&skip=${this.state.skip}&limit=${this.state.limit}`)
            .then((res) => { this.setState({ restaurantList: res.data }) })
    }

}

export default Listing;