import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Amplify, Auth, API, graphqlOperation, Storage } from 'aws-amplify';
import { listFiles, listVodAssets } from './graphql/queries';
import { createVodAsset, createVideoObject, createFile } from './graphql/mutations';
import { IconButton, Paper, TextField } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import GetAppIcon from '@material-ui/icons/GetApp';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';
import awsvideo from './aws-video-exports';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [files, setFiles] = useState([]);
  const [showAddFile, setShowAddFile] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState("");

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

  

  const downloadFile = async (idx) => {

    /*try {

      const file = files[idx];
      const fileAccessURL = await Storage.get(file.filePath, { expires: 60 });
      window.open(fileAccessURL, "_blank");

    } catch (error) {
      console.log('error on downloading file', error);
    }*/

    try {

      const file = files[idx];
      if(file.type != "video"){
        const fileAccessURL = await Storage.get(file.filePath, { expires: 60 });
        window.open(fileAccessURL, "_blank");
      } else {
        console.log("video");
        if(videoPlaying === idx) {
          setVideoPlaying("");
          return
        }
        setVideoPlaying(idx);
          return
      }

    } catch (error) {
      console.log('error on downloading file', error);
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
        {
          showAddFile ? (
            <AddFile onUpload = {() => {
              setShowAddFile(false)
              fetchFiles()
            }}/>
          ): <IconButton onClick={() => setShowAddFile(true)}>
              <AddIcon />
            </IconButton>
        }
        { files.map( (file, idx) => {
          return (
            <Paper variant="outlined" elevation={2} key = {`file${idx}`}>
              <div className="fileCard">
                <div className="fileName">{file.name}</div>
                <div className="fileUpdated">{file.updatedAt}</div>
                <IconButton aria-label = "download" onClick= {() => downloadFile(idx)}>
                  {file.type === "video" ? 
                    (
                      videoPlaying !== idx ? <PlayArrowIcon /> : <PauseIcon />
                    ) : <GetAppIcon /> 
                  }
                </IconButton>
              </div>
              {
                videoPlaying === idx ? (
                  <div>
                    <h2>{videoPlaying}</h2>
                  </div>
                ) : null
              }
            </Paper>
          )
        }) }
      </div>
    </div>
  );
}

export default withAuthenticator(App);

const AddFile = ({onUpload}) =>{

  const [mp4Data, setMp4Data] = useState();

  const uploadFile = () => {

    const uuid = uuidv4();
    const videoObject = {
      input: {
        id: uuid,
      },
    };

    const fileName = mp4Data.name;
    const fileExtension = fileName.toLowerCase().split('.');
    const fileType = fileExtension[fileExtension.length - 1];
    
    var type = "file";
    if(fileType == "mp4"){
      type = "video";
    }

    if(type == "video"){

      API.graphql(graphqlOperation(createVideoObject, videoObject)).then((response, error) => {
        if (error === undefined) {
          const videoAsset = {
            input: {
              title: fileName,
              description: "",
              vodAssetVideoId: uuid,
            },
          };
          API.graphql(graphqlOperation(createVodAsset, videoAsset));
          Storage.put(`${uuid}.${fileExtension[fileExtension.length - 1]}`, mp4Data, { contentType: 'video/*', bucket: awsvideo.awsInputVideo, customPrefix: { public: '' } }
          )
            .then(() => {
              const createFileInput = {
                id: uuidv4(),
                name: fileName,
                type: type,
                filePath: `https://${awsvideo.awsOutputVideo}/${uuid}/${uuid}.m3u8`,
              }
              console.log(createFileInput);
              API.graphql(graphqlOperation(createFile, {input: createFileInput}));
              console.log(`Successfully Uploaded: ${uuid}`);
              onUpload();
            })
            .catch((err) => console.log(`Error: ${err}`));
        }
      });

    } else {

      Storage.put(`${uuid}.${fileExtension[fileExtension.length - 1]}`, mp4Data
      )
        .then(() => {
          const createFileInput = {
            id: uuidv4(),
            name: fileName,
            type: type,
            filePath: `${uuid}.${fileExtension[fileExtension.length - 1]}`,
          }
          console.log(createFileInput);
          API.graphql(graphqlOperation(createFile, {input: createFileInput}));
          console.log(`Successfully Uploaded: ${uuid}`);
          onUpload();
        })
        .catch((err) => console.log(`Error: ${err}`));

    }

  };

  return (
    <div className="newFile">
      <input type="file" onChange={e => setMp4Data(e.target.files[0])} />
      <IconButton onClick = {uploadFile}>
        <PublishIcon />
      </IconButton>
    </div>
  )

}

