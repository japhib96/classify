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
    this.socket = io('https://3d6051e0.ngrok.io');
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
      // this.handleClose();
      this.props.setLecture(this.state.lectureId, this.state.lectureTitle)
      // this.sendFile()
    }
    catch(error) {
      console.log('catch', error);
    }
  }

    handleClose = () => this.setState({ modalOpen: false })
    handleOpen = () => this.setState({ modalOpen: true })




  render() {

    var name = this.state.uploadName
    return (
      <Modal trigger={<Icon bordered circular size="big" name='add circle' onClick={this.handleOpen} aria-label='Add circle'/>} centered={false} size="large" open={this.state.modalOpen} onClose={()=>this.handleClose()} >
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
