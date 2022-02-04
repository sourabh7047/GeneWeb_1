import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
// import Files from './FileItem';
import firebase from 'firebase/compat/app';
import FileList from './FileList';

class BasePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInvalid: true,
      files: [],
      // CompData: {},
      // client: '',
      // clientEmail: '',
      loading: false,
      trigger: true,
      key: "",
    };
    this.authUser = this.props.AuthUser;
  }

  onSubmit(e) {
    let randomString = Math.random().toString(36);
    this.props.firebase.dbstore
      .collection('users')
      .doc(`${this.authUser.uid}`)
      .update({
        data: firebase.firestore.FieldValue.arrayUnion(
          this.state.filedata,
        ),
      })
      .catch(error => {
        if (error) {
          return <div>{error}</div>;
        }
      })
      .then(file => {
        console.log(file);
        this.onlistenformessage();
        this.setState({key: randomString});
      })
      .then();

    e.preventDefault();
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.onlistenformessage();
  }

  onlistenformessage() {
    this.props.firebase.dbstore
      .collection('users')
      .doc(`${this.authUser.uid}`)
      .get()
      .then(doc => {
        if (doc.exists) {
          // complete backend data
          console.log(doc.data());
          let json = doc.data();

          if (json) {
            const templist = json.data.map(obj => obj.name);

            this.setState({
              // CompData: json,
              // client: json.displayName,
              // clientEmail: json.email,
              // loading: false,
              files: templist,
              loading: false,
            });
          } else {
            this.setState({ files: null, loading: false });
          }
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  }

  componentWillUnmount() {}

  handleChange(e) {
    // get the files
    let file = e.target.files[0];

    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      let fileInfo = {
        name: file.name,
        type: file.type,
        base64: reader.result,
      };

      this.setState({
        isInvalid: false,
        filedata: fileInfo,
      });
    };
  }
  render() {
    const { isInvalid, files, loading } = this.state;
    return (
      <div>
        {loading && <div>loading ...</div>}

        {files
          ? files.map(file => (
              <ul>
                <li>{file}</li>
              </ul>
            ))
          : null}

        {!files && <div>there is on files ...</div>}

        <form onSubmit={event => this.onSubmit(event)}>
          <label htmlFor="myfile">Select a file:</label>
          <input
            type="file"
            onChange={this.handleChange.bind(this)}
            key={this.state.key}
          />
          <button disabled={isInvalid} type="submit">
            submit
          </button>
        </form>
      </div>
    );
  }
}

export default withFirebase(BasePage);
