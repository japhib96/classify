import React from 'react'
import { Icon, Button, Header, Image, Modal, Form, Checkbox } from 'semantic-ui-react'
import axios from 'axios';
import Dropzone from 'react-dropzone'
import io from "socket.io-client";
import PDF from 'react-pdf-js';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

class CreateLectureModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lectureTitle: '',
      password: '',
      uploadFile: '',
      filePath: '',
      uploadName: '',
      lectureId: '',
      slideId: '',
      modalOpen: false,
      redirect: false


    };
    this.socket = io('localhost:3001');
  }


  async saveLecture() {
    var self = this;
    try {
      await axios.post('/saveLecture', {
        classId : this.props.classId,
        lectureTitle: this.state.lectureTitle,
        password: this.state.password,

      }).then( (res) =>{
        self.setState({lectureId: res.data.lectureId})
      })
      this.handleClose();
      this.props.setLecture(this.state.lectureId, this.state.lectureTitle)
      // this.sendFile()
    }
    catch(error) {
      console.log('catch', error);
    }
  }

    handleClose = () => this.setState({ modalOpen: false })
    handleOpen = () => this.setState({ modalOpen: true })

  //   onChange(acceptedFiles, rejectedFiles) {
  //   this.setState({uploadFile: acceptedFiles[0], filePath: '', uploadName: acceptedFiles[0].name})
  // }

    // sendFile(){
    //   // e.preventDefault()
    //   // console.log(req.user)
    //   console.log('lecture saved', this.state.lectureId)
    //   var data = new FormData()
    //   data.append("uploadFile", this.state.uploadFile)
    //   data.append("lectureId", this.state.lectureId)
    //   fetch("/uploadSlide", {
    //     method:"POST",
    //     credentials:"same-origin",
    //     body: data
    //   })
    //   .then((res) => res.json() )
    //   .then((res) => {
    //     if(res.status === 'success'){
    //       console.log('it worked', res.id)
    //       var filePath = 'http://localhost:3001/slide/' + res.id
    //       this.setState({filePath, uploadFile: '', slideId: res.id})
    //
    //     }
    //   })
    //   .catch(err => {
    //     console.log("Error: ", err)
    //   })
    // }
    //
    // onDocumentComplete = (pages) => {
    //   this.socket.emit('TOTAL_SLIDES', {
    //     slideId: this.state.slideId,
    //     slides: pages,
    //   })
    // }



  render() {

    var name = this.state.uploadName
    return (
      <Modal closeIcon trigger={<Icon bordered circular size="big" name='add circle' onClick={this.handleOpen} aria-label='Add circle'/>} centered={false} size="large" open={this.state.modalOpen} >
        <Modal.Header>Create A Lecture</Modal.Header>
        <Modal.Content>
        <Form>
            <Form.Field>
              <label>Lecture Name</label>
              <input placeholder='Lecture Name' onChange={ (e)=> this.setState({lectureTitle: e.target.value}) } />
            </Form.Field>
            <Form.Field>
              <label>Lecture Password</label>
              <input required placeholder='Lecture Password' onChange={ (e)=> this.setState({password: e.target.value}) }/>
            </Form.Field>
            <Button type='submit' onClick={() => this.saveLecture()}>Submit</Button>
          {/*  <Dropzone onDrop={(files) => this.onChange(files)}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            {this.state.uploadName === '' ? '' : <div><p>{name}</p> <Button type='submit' onClick={() => this.saveLecture()}>Submit</Button></div> } */}
            <Modal.Actions centered>
            </Modal.Actions>
          </Form>
        </Modal.Content>

      </Modal>
    );
  }
}

export default CreateLectureModal
