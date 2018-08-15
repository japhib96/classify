import React from 'react';
import PDF from 'react-pdf-js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import Fullscreen from "react-full-screen";
import io from "socket.io-client";
import Dropzone from 'react-dropzone'
import {Button, Icon} from 'semantic-ui-react'
import Loading from '../Loader';
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
      uploadName: '',
      page: 1,
      loading: false
    };
    this.socket = io('https://3d6051e0.ngrok.io');
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
      console.log(resp)
      if(resp.data.slideId){
        var filePath = 'https://3d6051e0.ngrok.io/slide/' + resp.data.slideId
        var slideId = resp.data.slideId
        var page = resp.data.currentSlide
        this.setState({filePath, uploadFile: '', slideId, page, loading: true})
      }
    }).catch((e)=>{
      alert(e)
    });
  }

  goFull = () => {
    this.setState({ isFull: true });
  }
  onDocumentComplete = (pages) => {
    this.setState({ pages, loading: false });
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
  this.setState({uploadFile: acceptedFiles[0], filePath: '', page: 1, uploadName: acceptedFiles[0].name})
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
        var filePath = 'https://3d6051e0.ngrok.io/slide/' + res.id
        var slideId = res.id
        this.setState({filePath, uploadFile: '', slideId, loading: true })
      }
    })
    .catch(err => {
      console.log("Error: ", err)
    })
  }


  render() {
    // if (this.state.loading) { return <Loading message={'Loading presentation...'} /> };
    console.log('page state', this.state.page)
    var name = this.state.uploadName
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    console.log('render', this.state.filePath)
    return (
      <div className="pdf wrapper">
        <div className="dropzone outer wrapper">
        {this.state.filePath === '' ?
          <div className="dropzone inner wrapper">
            <Dropzone onDrop={(files) => this.onChange(files)} className="dropzone area">
              <div className="drag and drop"> <Icon bordered circular name='add circle' size="massive" /> <br></br>
                <h2>Drag and Drop or click to select files to upload.</h2><br></br>
                {this.state.uploadName === '' ? '' : <h2>{name}</h2> }
              </div>
            </Dropzone>
            {this.state.uploadName === '' ? '' :
              <div className="dropzone button">
              <Button size="massive" type="submit" onClick={ (e)=>this.sendFile(e)}>Upload</Button>
              </div>
           }

          </div>
          :
          <Fullscreen
            enabled={this.state.isFull}
            onChange={isFull => this.setState({isFull})}
            >
              <div className="pdf view">
                {this.state.loading ? <Loading message={'Loading presentation...'} /> : null }
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
