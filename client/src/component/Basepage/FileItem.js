import React, { Component } from 'react';
import { withFirebase } from '../Firebase';



class FileItem extends Component {
  constructor(props) {
    super(props);
    this.files = this.props.files
  }

  render() {
    return (
      <div>
       
          {this.files.map((file, index) => {
            return <li >{file}</li>;
          })}
       
      </div>
    );
  }
}

export default withFirebase(FileItem);
