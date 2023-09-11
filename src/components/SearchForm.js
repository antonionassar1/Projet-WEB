import React, {Component} from 'react';
import { searchItem, fetchItems , itemsLoading} from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { useHistory, withRouter, Route } from 'react-router-dom';
import { useState } from 'react';

export class  SearchForm extends Component {

  constructor(props) {
    super(props);

  }


      searchProduct(path) {
        // let b=new URLSearchParams(this.props.location.search).get("searchText")
        let c = document.getElementById("entry").value;
        // alert("You are searching for "+ c )
       
        if (c.trim() != "") {

          alert("You are searching for "+c )
          
            this.props.history.push(path+`/${c}`);
              
            
        }
        else{
          alert("No Search entry available" );
          return false
          
        }
    }
    render(){
        return (
            <div className="jumbotron jumbotron-fluid mt-9 text-center">
        <div className="container">
          <h1 className="display-9 mb-9">
            <i className="fa fa-search" /> Search for categories,items...
          </h1>
          <form id="searchForm" onSubmit={this.searchProduct} >
            <input
              type="text"
              id="entry"
              className="form-control"
              name="searchText"
              placeholder="Chou Badak?"
              // onChange={this.onChange}
              // innerRef={(input) => this.searchText = input}
            />
             {/* <ItemsContainer items = {this.props.items}/> */}
            <button type="submit" className="btn btn-primary btn-bg mt-3" onClick={() => this.searchProduct('/results')}>
              Search
            </button>
          </form>
        </div>
      </div>
        )
    }
}
const mapStateToProps = state => ({
    text: state.items.name
  })
export default withRouter(connect(mapStateToProps) (SearchForm));