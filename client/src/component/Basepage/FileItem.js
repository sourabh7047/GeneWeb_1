import React, { Component } from 'react';
import { withFirebase } from '../Firebase';



class FileItem extends Component {
  constructor(props) {
    super(props);
    this.files = this.props.files
  }

  // componentDidMount() {
  //   this.props.firebase.dbstore
  //     .collection('users')
  //     .doc(`${this.props.authUser.uid}`)
  //     .get()
  //     .then(doc => {
  //       if (doc.exists) {
  //         // doc data but contain both array and key/value pair
  //         let json = doc.data();

  //         this.setState({ CompData: json });

  //         console.log(this.state.CompData);
  //       console.log("firestore data");

  //       this.state.CompData.data.map((obj)=>{
  //           this.state.files.push(obj.name);
  //       })
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log('No such document!');
  //       }
  //     })
  //     .catch(error => {
  //       console.log('Error getting document:', error);
  //     });
  

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
