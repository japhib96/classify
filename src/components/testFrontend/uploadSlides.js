import React from 'react';

import Dropzone from 'react-dropzone';




class UploadScreen extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        uploadStatus: false
      }
    // this.handleUploadImage = this.handleUploadImage.bind(this);
  }


  // handleUploadImage(ev) {
  //   ev.preventDefault();
  //
  //   const data = new FormData();
  //   data.append('file', this.uploadInput.files[0]);
  //   data.append('filename', this.fileName.value);
  //
  //   axios.post('http://localhost:8000/upload', data)
  //     .then(function (response) {
  //   this.setState({ imageURL: `http://localhost:8000/${body.file}`, uploadStatus: true });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

onDrop(acceptedFiles, rejectedFiles) {
 console.log(acceptedFiles)
}

  render() {
    return(
  <Dropzone onDrop={(files) => this.onDrop(files)}>
    <div>Try dropping some files here, or click to select files to upload.</div>
  </Dropzone>
)}
}

//   constructor(props){
//   super(props);
//   this.state={
//      filesPreview:[],
//      filesToBeSent:[],
//      printcount:1,
//      printingmessage: 'Print Bitch'
//     }
// }
//
// onDrop(acceptedFiles, rejectedFiles) {
//   var filesToBeSent=[];
//     if(filesToBeSent.length < this.state.printcount){
//       filesToBeSent.push(acceptedFiles);
//       var filesPreview=[];
//       for(var i in filesToBeSent){
//         filesPreview.push(<div>
//           {filesToBeSent[i][0].name}
//           <MuiThemeProvider>
//           <a href="#"><FontIcon
//             className="material-icons customstyle"
//             color={blue500}
//             styles={{ top:10,}}
//           >clear</FontIcon></a>
//           </MuiThemeProvider>
//           </div>
//         )
//       }
//       this.setState({filesToBeSent,filesPreview});
//       console.log(filesToBeSent)
//     }
//     else{
//       alert("You have reached the limit of printing files at a time")
//     }
// }
//
// handleClick(event){
//   // console.log("handleClick",event);
//   var self = this;
//   if(this.state.filesToBeSent.length>0){
//     var filesArray = this.state.filesToBeSent;
//     console.log(filesArray[0][0])
//     request.post('/saveSlides')
//       .attach(filesArray[0][0].name, filesArray[0][0].preview)
//       .then( (err,res) => {
//       if(err){
//         console.log("error ocurred", err);
//       } else{
//       console.log("res",res);
//       alert("File printing completed")
//     }
//     });
//   }
//   // try {
//   //   await axios.post('/saveSlide', {
//   //     files: filesArray
//   //   })
//   //   console.log('classroom saved')
//   // }
//   // catch(error) {
//   //   console.log(error);
//   // }
//   else{
//     alert("Please upload some files first");
//   }
// }
//
//
// render() {
//     return (
//      <div>
//      <div>
//      <MuiThemeProvider>
//        <div>
//        <AppBar
//           title="Print Files"
//         />
//         </div>
//      </MuiThemeProvider>
//          <center>
//          <div>
//            You can upload upto {this.state.printcount} files at a time.
//          </div>
//          <Dropzone onDrop={(files) => this.onDrop(files)}>
//                <div>Try dropping some files here, or click to select files to upload.</div>
//          </Dropzone>
//          <div>
//          Files to be printed are:
//          {this.state.filesPreview}
//          </div>
//          </center>
//          <div>
//          {this.state.printingmessage}
//          </div>
//      <MuiThemeProvider>
//           <RaisedButton label="Print Files" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
//      </MuiThemeProvider>
//          </div>
//          </div>
//      )
//  }
// }
//
//

export default UploadScreen;
