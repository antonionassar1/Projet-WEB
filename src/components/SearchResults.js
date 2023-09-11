import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ITEMS } from '../shared/items'
import { CATEGORIES } from '../shared/categories';
import ItemCard from './ItemCard';
import SearchForm from './SearchForm';

class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: ITEMS

        }
    }




    render() {
        let SearchByItem = [];
        let SearchByItemname=[];
        let SearchByCateg=[];
        let SearchByCategname=[];
        let contentForItems =''
        let  contentForCategories =''
        const currentURL = window.location.href

        const lastSegment = currentURL.split("/").pop();
        var res_final = lastSegment.replace("%20", " ");
        // var res_final2 = lastSegment.split("%20");


        for (let i = 0; i < ITEMS.length; ++i) {
                      if (ITEMS[i].name.toLowerCase().includes(res_final.toLowerCase()) ){
                        SearchByItemname.push((ITEMS[i].name))
                        SearchByItem.push(ITEMS[i])
                      }
                    }
        for (let i = 0; i < CATEGORIES.length; ++i) {
                if (CATEGORIES[i].name.toLowerCase().includes(res_final.toLowerCase()) ){  
                    SearchByCategname.push(CATEGORIES[i].name)   
                    SearchByCateg.push(...(ITEMS.filter((item) => item.id_category === CATEGORIES[i].id_category)))

                        }
                   
                        }
                

        
      contentForItems = SearchByItem.length >0 ? SearchByItem.map((item) => (<ItemCard item={item} />)): null;
      contentForCategories = SearchByCateg.length >0 ? SearchByCateg.map((item) => (<ItemCard item={item} />)): null;
      if (contentForItems===null && contentForCategories===null){
          return (
            <div className="container">
                <SearchForm />
            <div className="row">
                 <Breadcrumb>
                 <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                 <BreadcrumbItem active>Search results</BreadcrumbItem>
                 </Breadcrumb>            
                 <div className="col-12">
                    {/* <h1> {this.props.items.items[0]}</h1> */}
                    <h3>No item was found related to : {res_final} </h3>
       
                </div>

            </div>
            </div>
          )
                }
        else if (contentForCategories===null && contentForItems !=null){
            return (
                <div className="container">
                <SearchForm />
            <div className="row">
                 {/* <Breadcrumb>
                 <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                 <BreadcrumbItem active>{res_final}</BreadcrumbItem>
                 </Breadcrumb>             */}
                 <div className="col-12">
                    {/* <h1> {this.props.items.items[0]}</h1> */}
                    <h3>Items related to your search ({res_final}) : {(SearchByItemname.slice(0,2)).join()}... ({SearchByItem.length} item(s))</h3>
    
                </div>
                {contentForItems}
            </div>
            </div>

            )

        }

        else if (contentForCategories !=null && contentForItems ===null){
            return (
                <div className="container">
                    <SearchForm />
                <div className="row">
                     {/* <Breadcrumb>
                     <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                     <BreadcrumbItem active>{res_final}</BreadcrumbItem>
                     </Breadcrumb>             */}
                     <div className="col-12">
                        {/* <h1> {this.props.items.items[0]}</h1> */}
                        <h3>Categories related to your search ({res_final}) : {(SearchByCategname.slice(0,2)).join()}... ({SearchByCateg.length} item(s))</h3>
           
                    </div>
                    {contentForCategories }
                </div>
                </div>

            )

        }
        else {
            


      
      return (
        <div className="container">
            <SearchForm />
        <div className="row">
             {/* <Breadcrumb>
             <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
             <BreadcrumbItem active>{res_final}</BreadcrumbItem>
             </Breadcrumb>             */}
             <div className="col-12">
                {/* <h1> {this.props.items.items[0]}</h1> */}
                <h3>Items related to your search ({res_final}) : {(SearchByItemname.slice(0,2)).join()}... ({SearchByItem.length} item(s))</h3>

            </div>
            {contentForItems}
        </div>
        
         <div className="container">
     <div className="row">

          <div className="col-12">
             {/* <h1> {this.props.items.items[0]}</h1> */}
             <h3>Categories related to your search ({res_final}) : {(SearchByCategname.slice(0,2)).join()}... ({SearchByCateg.length} item(s))</h3>

         </div>
         {contentForCategories }
     </div>
     </div>
     </div>

      );
    }
}
}

export default SearchResults;