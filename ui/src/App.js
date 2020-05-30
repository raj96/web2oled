import React from "react";
import axios from "axios";
import "./App.css";

import { Input, Grid, Typography, Button } from "@material-ui/core";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import FolderIcon from "@material-ui/icons/Folder";

class App extends React.Component {
  state = {
    selectedFile: undefined,
  };
  fileHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] }, () => {
      console.log(this.state.selectedFile);
    });
  };

  uploadFile = () => {
    const formData = new FormData();
    formData.append("img", this.state.selectedFile);

    axios
      .post("/upload", formData)
      .then(() => window.alert("Photo updated on Web2OLED"))
      .catch(() => window.alert("Uploaded file not an image"));
  };

  render() {
    return (
      <div className="App">
        <Grid
          container
          direction="column"
          alignContent="center"
          spacing={2}
          style={{ height: "100vh" }}
        >
          <Grid item xs={6}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <img
                  src="/default.png"
                  height="64px"
                  width="128px"
                  alt="image"
                />
              </Grid>
              <Grid item>
                <Typography variant="h4">Upload an Image</Typography>
              </Grid>
              <Grid item>
                <Input
                  type="file"
                  style={{ display: "none" }}
                  ref={(inputRef) => {
                    if (inputRef) this.inputRef = inputRef.children[0];
                  }}
                  onChange={this.fileHandler}
                />
                <Button
                  startIcon={<FolderIcon />}
                  onClick={() => this.inputRef.click()}
                >
                  Choose File
                </Button>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<CloudUploadIcon />}
                  onClick={this.uploadFile}
                >
                  Upload
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
