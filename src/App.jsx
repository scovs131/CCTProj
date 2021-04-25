import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listFiles } from './graphql/queries';
import { IconButton, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';

function App() {

  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, [])

  const fetchFiles = async () =>{

    try {

      const fileData = await API.graphql(graphqlOperation(listFiles));
      const fileList = fileData.data.listFiles.items;
      console.log('file list', fileList);
      setFiles(fileList);

    } catch (error) {
      console.log('error on fetching files', error);
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>{Auth.user.attributes.email}</h3>
        <AmplifySignOut />
      </header>
      <div className="fileList">
        { files.map( (file, idx) => {
          return (
            <Paper variant="outlined" elevation={2} key = {idx}>
              <div className="fileCard">
                <IconButton aria-label = "download">
                  <GetAppIcon />
                </IconButton>
                <div className="fileName">{file.name}</div>
                <div className="fileOwner">{file.owner}</div>
                <div className="fileUpdated">{file.updatedAt}</div>
                <IconButton aria-label = "delete">
                  <DeleteIcon />
                </IconButton>
                
                
              </div>
            </Paper>
          )
        }) }
      </div>
    </div>
  );
}

export default withAuthenticator(App);
