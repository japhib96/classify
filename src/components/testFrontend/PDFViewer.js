import React from 'react';
import PDF from 'react-pdf-js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import Fullscreen from "react-full-screen";
import io from "socket.io-client";
import Dropzone from 'react-dropzone'
import axios from 'axios';

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

  componentDidMount(){
    this.checkSlides()
  }

  async checkSlides(){
    let slide;
    await axios.post('/getSlides', {
      lectureId : this.props.lectureId
    })
    .then((resp) => {
      if(resp.data.slideId !== ''){
        var filePath = 'http://localhost:3001/slide/' + resp.data.slideId
        var slideId = resp.data.slideId
        var page = resp.data.currentSlide
        this.setState({filePath, uploadFile: '', slideId, page})
      }
    }).catch((e)=>{
      alert(e)
    });
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
    this.socket.emit('UPDATE_SLIDE',{
      slideId: this.state.slideId,
      page: this.state.page -1,
    })
    this.setState({ page: this.state.page - 1 });
  }
  handleNext = () => {
    this.socket.emit('UPDATE_SLIDE',{
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
// onChange1(e) {
//   console.log(e.target.files[0])
// this.setState({uploadFile: e.target.files[0], filePath: ''})
// }
  sendFile(e){
    e.preventDefault()
    // console.log(req.user)
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
        // var filePath = res.event.pdf
        // var url = `url(../../slides/${filePath && filePath.filename})`
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
      <div>


      {this.state.filePath === '' ?
      <div>
      <Dropzone onDrop={(files) => this.onChange(files)}>
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {this.state.uploadName === '' ? '' : <div><p>{name}</p><button type="submit" onClick={ (e)=>this.sendFile(e)}>Upload</button></div> }
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
    )
  }
}
export default MyPdfViewer;
