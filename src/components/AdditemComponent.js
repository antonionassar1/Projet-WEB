import axios from 'axios';
 
import React,{Component} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

 
class Additem extends Component {
  
    state = {  // Initially, no file is selected
        selectedFile: null
      };

      // On file select (from the pop up)
    onFileChange = event => {
    
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
      
      };

       // On file upload (click the upload button)
    onFileUpload = () => {
    
        // Create an object of formData
        // const formData = new FormData();
        let c = document.getElementById("entry").value;
        let path = document.getElementById("path").value;
        let dropdown_value= document.getElementById('categ');
        let price= parseInt(document.getElementById("price").value,10);
        var value = dropdown_value.options[dropdown_value.selectedIndex].value;
        var url = window.location.pathname;
        console.log(url);
        this.props.additem(c,value,path,price)
    
      
        // Update the formData object
        // formData.append(
        //   "myFile",
        //   this.state.selectedFile,
        //   this.state.selectedFile.name
        // );


         // Details of the uploaded file
      // console.log(this.state.selectedFile.name);
    
      // Request made to the backend api
      // Send formData object
     // axios.post("api/uploadfile", formData);
    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {
    
        if (this.state.selectedFile) {
           
          return (
            <div>
              <h2>File Details:</h2>
               
             <p>File Name: {this.state.selectedFile.name}</p>
   
               
  <p>File Type: {this.state.selectedFile.type}</p>
   
               
  <p>
                Last Modified:{" "}
                {this.state.selectedFile.lastModifiedDate.toDateString()}
              </p>
   
            </div>
          );
        } else {
          return (
            <div>
              <br />
              <h4>Choose before Pressing the Upload button</h4>
            </div>
          );
        }
      };
      render() {
        const options = [
          'electronics', 'tools'
        ];
        const defaultOption = options[0];
    
        return (
          <div>
              <h1>
                Add New Item 
              </h1>
              <div className="row">
              <h3>
                PPlease Upload an image representing the item :
              </h3>
             
              <input type="file" onChange={this.onFileChange} accept=".jpg,.png" />
                  <button onClick={this.onFileUpload}>
                    Upload!
                  </button>
                  </div>
              <div>
              <div className="container">
              <div className="col-md-3 product-detail">
              <div className="row">
              <h5> Choose a category </h5>
              {/* //<Dropdown options={options} id= 'categ' onChange={this._onSelect} value={defaultOption} placeholder="Select an option" /> */}
              <select id="categ" onChange="update()">
			<option value="electronics">electronics</option>
			<option value="tools">tools</option>
		</select>
    <div className="row">
              <form id="searchForm" onSubmit={this.searchProduct} >
              {/* <h5> Choose a category </h5> */}
            <input
              type="text"
              id="entry"
              className="form-control"
              name="searchText"
              placeholder="Item Name"
              // onChange={this.onChange}
              // innerRef={(input) => this.searchText = input}
            />
             {/* <ItemsContainer items = {this.props.items}/> */}

          </form>
          </div>
          </div>
          <form id="searchForm" onSubmit={this.searchProduct} >
            <input
              type="text"
              id="path"
              className="form-control"
              name="searchText"
              placeholder="Enter img full path"
              // onChange={this.onChange}
              // innerRef={(input) => this.searchText = input}
            />
             {/* <ItemsContainer items = {this.props.items}/> */}

          </form>
                  </div>
                  <div className="col-md-3 product-detail">
                  <form id="searchForm" onSubmit={this.searchProduct} >
            <input
              type="text"
              id="price"
              className="form-control"
              name="searchText"
              placeholder="Enter price"
              // onChange={this.onChange}
              // innerRef={(input) => this.searchText = input}
            />
             {/* <ItemsContainer items = {this.props.items}/> */}

          </form>
          </div>
            
                  
                
                  </div>
              </div>
            {this.fileData()}
          </div>
        );
      }
    }
   
    export default Additem;