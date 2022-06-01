import React,{Component} from 'react';
import Search from './Search';
import QuickSearch from './QuickSearch';
import Header from '../Header';

class Home extends Component {
    render(){
        return(
        <>
            <Header/>
            <Search/>
            <QuickSearch/>
        </>
        )
    }
}

export default Home;