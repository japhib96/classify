import React from 'react';
import PDF from 'react-pdf-js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import Fullscreen from "react-full-screen";
import io from "socket.io-client";
import Dropzone from 'react-dropzone'
import {Button} from 'semantic-ui-react'
library.add(faExpand)
class MyPdfViewer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isFull: false,
      filePath: '',
      slideId: '',
      pages: 0,
      uploadName: ''
    };
    this.socket = io('localhost:3001');
  }
  goFull = () => {
    this.setState({ isFull: true });
  }
  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
    this.socket.emit('TOTAL_SLIDES',{
      slideId: this.state.slideId,
      slides: pages,
    })
  }
  handlePrevious = () => {
    this.socket.emit('TOTAL_SLIDES',{
      slideId: this.state.slideId,
      page: this.state.page -1,
    })
    this.setState({ page: this.state.page - 1 });
  }
  handleNext = () => {
    this.socket.emit('TOTAL_SLIDES',{
      slideId: this.state.slideId,
      page: this.state.page +1,
    })
    this.setState({ page: this.state.page + 1 });
  }
  renderPagination = (page, pages) => {
    let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"></li>;
    }
    let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    let fullScreenButton = <button onClick={this.goFull}> <FontAwesomeIcon icon="expand" size="2x"/> Go Fullscreen</button>
    if (page === pages) {
      nextButton = <li className="next disabled"></li>;
    }
    return (
      <div className="nav col">
        <ul className="pager">
          {previousButton}
          {fullScreenButton}
          {nextButton}
        </ul>
      </div>
    );
  }
  onChange(acceptedFiles, rejectedFiles) {
  this.setState({uploadFile: acceptedFiles[0], filePath: '', uploadName: acceptedFiles[0].name})
}

  sendFile(e){
    e.preventDefault()

    var data = new FormData()
    data.append("uploadFile", this.state.uploadFile)
    data.append("lectureId", this.props.lectureId)
    fetch("/uploadSlide", {
      method:"POST",
      credentials:"same-origin",
      body: data
    })
    .then((res) => res.json() )
    .then((res) => {
      console.log(res)
      if(res.status === 'success'){
        console.log(res.id)

        var filePath = 'http://localhost:3001/slide/' + res.id
        var slideId = res.id
        this.setState({filePath, uploadFile: '', slideId})
      }
    })
    .catch(err => {
      console.log("Error: ", err)
    })
  }
  render() {
    var name = this.state.uploadName
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    console.log('render', this.state.filePath)
    return (
      <div className="pdf wrapper">
        <div className="dropzone wrapper">
        {this.state.filePath === '' ?
          <div>
            <Dropzone onDrop={(files) => this.onChange(files)} className="dropzone area">
              <div className="drag and drop">Drag and Drop or click to select files to upload.</div>
              {this.state.uploadName === '' ? '' : <p>{name}</p> }
            </Dropzone>
              <div className="dropzone button">
                <Button type="submit" onClick={ (e)=>this.sendFile(e)}>Upload</Button>
              </div>
          </div>
          :
          <Fullscreen
            enabled={this.state.isFull}
            onChange={isFull => this.setState({isFull})}
            >
              <div className="pdf view">
                <PDF
                  file={this.state.filePath}
                  onDocumentComplete={this.onDocumentComplete}
                  page={this.state.page}
                />
                {pagination}
              </div>
            </Fullscreen>
          }
        </div>
      </div>
    )
  }
}
export default MyPdfViewer;
