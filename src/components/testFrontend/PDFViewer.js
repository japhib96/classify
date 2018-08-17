import React from 'react';
import PDF from 'react-pdf-js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import Fullscreen from "react-full-screen";
import io from "socket.io-client";
import Dropzone from 'react-dropzone'
import {Button, Icon, Header, List, Label} from 'semantic-ui-react'
import Loading from '../Loader';
import axios from 'axios';
import keydown from 'react-keydown';
import { Emoji } from 'emoji-mart';

library.add(faExpand)


class MyPdfViewer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isFull: false,
      filePath: '',
      allReactions: [],
      slideId: '',
      pages: 0,
      uploadName: '',
      page: 1,
      loading: false,
      loading2: false
    };
      this.socket = io('localhost:3001');


    var self = this;

    this.socket.on("ALL_REACTIONS", function(reactions){
      console.log('all reactions')
      self.setState({allReactions: reactions})
    })
  }

  componentDidMount(){
    this.checkSlides()
    document.addEventListener("keydown", this.handlePrevious, false);
    document.addEventListener("keydown", this.handleNext, false);

    this.socket.emit('REACTION',{
      reaction: '',
      user: this.props.user._id,
      class: this.props.lecture.id
    })
  }

  async checkSlides(){
    let slide;
    await axios.post('/getSlides', {
      lectureId : this.props.lectureId
    })
    .then((resp) => {
      console.log(resp)
      if(resp.data.slideId){
        var filePath = 'http://localhost:3001/slide/' + resp.data.slideId
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


  handlePrevious = (e) => {
    e.preventDefault();
    if (e.keyCode === 37 && this.state.page > 1) {
      console.log(e.keyCode);
      this.socket.emit('UPDATE_SLIDE',{
        slideId: this.state.slideId,
        page: this.state.page -1,
      })
      this.setState({ page: this.state.page - 1 });
    }
  }



  handleNext = (e) => {
    e.preventDefault();
    if(e.keyCode === 39 && this.state.page < this.state.pages) {
      this.socket.emit('UPDATE_SLIDE',{
        slideId: this.state.slideId,
        page: this.state.page +1,
      })
      this.setState({ page: this.state.page + 1 });
    }
  }

  onChange(acceptedFiles, rejectedFiles) {
  this.setState({uploadFile: acceptedFiles[0], filePath: '', page: 1, uploadName: acceptedFiles[0].name})
  }

  sendFile(e){
    this.setState({
      loading2: true
    })

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
        var filePath = 'http://localhost:3001/slide/' + res.id
        var slideId = res.id
        this.setState({filePath, uploadFile: '', slideId, loading: true })
      }
    })
    .catch(err => {
      console.log("Error: ", err)
    })
  }


  render() {

    var thumbsUp=0;
    var okay=0;
    var thumbsDown=0;
    var confused =0;
    this.state.allReactions.map( (reactionObj, index) =>{

      if(reactionObj.reaction === -1){
        thumbsDown += 1
      }
      else if(reactionObj.reaction === 0){
        okay += 1
      }
      else if(reactionObj.reaction === +1){
        thumbsUp += 1
      }
      else{
        confused += 1
      }
    }
  )

    console.log('page state', this.state.page)
    var name = this.state.uploadName
    console.log('render', this.state.filePath)
    return (
      <div className="pdf wrapper">
        <div className="dropzone outer wrapper">
        {this.state.filePath === '' ?
          <div className="dropzone inner wrapper">
            <Dropzone onDrop={(files) => this.onChange(files)} className="dropzone area">
              <div className="drag and drop"> <Icon bordered circular name='add circle' size="massive" /> <br></br>
                <h2>Drag and Drop or Click to upload presentations.</h2><br></br>
                {this.state.uploadName === '' ? '' : <h2>{name}</h2> }
              </div>
            </Dropzone>
            {this.state.uploadName === '' ? '' :
              <div className="dropzone button">
                <Button  size="massive" loading={this.state.loading2} type="submit" onClick={ (e)=>this.sendFile(e)}>Upload</Button>
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
                <Button onClick={this.goFull}> <FontAwesomeIcon icon="expand" size="2x"/></Button>
                {this.state.isFull === false ? '' :
                  <div className="nav col">
                    <div className="pager">
                      <div className="main emoji content">
                        <div className="emoji container">
                          <div className="emoji content">
                            <Emoji  emoji='thumbsup' set='apple' skin="1" size={50} />
                            <Label size="massive" >{thumbsUp}</Label>
                          </div>
                          <div className="emoji content">
                            <Emoji  emoji='ok_hand' set='apple' skin="2" size={50} />
                            <Label size="massive" >{okay}</Label>
                          </div>
                          <div className="emoji content">
                            <Emoji  emoji='thumbsdown' set='apple' skin="3" size={50} />
                            <Label size="massive" >{thumbsDown}</Label>
                          </div>
                          <div className="emoji content">
                            <Emoji  emoji='exploding_head' set='apple' skin="1" size={50} />
                            <Label size="massive" >{confused}</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
               }
               </div>
            </Fullscreen>
          }
        </div>
      </div>
    )
  }
}
export default MyPdfViewer;
