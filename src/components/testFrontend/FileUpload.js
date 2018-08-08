import React from 'react';
import Dropzone from 'react-dropzone';
import Iframe from 'react-iframe'
import FileViewer from 'react-file-viewer';

 class FileUpload extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        uploadFile: '',
        fileViewable: false
      }
    // this.handleUploadImage = this.handleUploadImage.bind(this);
  }



onDrop(acceptedFiles, rejectedFiles) {
 console.log(acceptedFiles[0])
 var length = acceptedFiles[0].preview.length
 var pptUrl = acceptedFiles[0].preview.slice(5, length)
 console.log(pptUrl)
 this.setState({fileViewable: true, uploadFile: pptUrl})
 console.log(this.state.fileViewable, this.state.uploadFile)
}

getUrl(){
  return 'https://view.officeapps.live.com/op/embed.aspx?src=[' + this.state.uploadFile + ']'
}

  render() {
    // const url = 'https://view.officeapps.live.com/op/embed.aspx?src=[' + 'https://utexas-my.sharepoint.com/:p:/r/personal/alk2488_austin_eid_utexas_edu/Documents/9a385a22-b1e1-4f1d-b538-d6c6e70bd68e.pptx?d=w543e054dba2744fc9fe07a3c00e74a8a&csf=1&e=2zGKCJ' + ']'
    const url ='https://utexas-my.sharepoint.com/:p:/r/personal/alk2488_austin_eid_utexas_edu/Documents/9a385a22-b1e1-4f1d-b538-d6c6e70bd68e.pptx?d=w543e054dba2744fc9fe07a3c00e74a8a&csf=1&e=2zGKCJ'
    console.log(url)
    return(
  <div>
    <Dropzone onDrop={(files) => this.onDrop(files)}>
      <div>Try dropping some files here, or click to select files to upload.</div>
    </Dropzone>
    {this.state.fileViewable ?
      <Iframe url= {url}
          width="450px"
          height="450px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
          allowFullScreen/>

       :
      <div></div>}
</div>

  )}
}

export default FileUpload
