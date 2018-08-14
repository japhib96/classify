import React from 'react'
import { Icon, Button, Header, Image, Modal, Form, Checkbox } from 'semantic-ui-react'
import axios from 'axios';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';



class JoinClassModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classID: '',
      password: '',
      uploadFile: '',
      filePath: '',
      uploadName: '',
      lectureId: '',
      slideId: '',
      redirect: false


    };
  }


  async joinClass() {
    var self = this;
    try {

      await axios.post('/class/join', {
        classId: this.state.classID,
        password: this.state.password
      }).then( (res) =>{
        console.log('Class Sucessfully Joined');
        self.props.setClass(this.state.classID);
      })
    }
    catch(error) {
      console.log('catch', error);
    }
  }



  render() {
    var name = this.state.uploadName


    return (
      <Modal trigger={<Icon bordered circular size="big" name='add circle' aria-label='Add circle'/>} centered={false} size="large">
        <Modal.Header>Join A Class</Modal.Header>
        <Modal.Content>
        <Form>
            <Form.Field>
              <label>Class Name</label>
              <input placeholder='Class ID' onChange={ (e)=> this.setState({classID: e.target.value}) } />
            </Form.Field>
            <Form.Field>
              <label>Class Password</label>
              <input required placeholder='Class Password' onChange={ (e)=> this.setState({password: e.target.value}) }/>
            </Form.Field>
            <Modal.Actions centered>
            <Button type='submit' onClick={() => this.joinClass()}>Submit</Button>
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default JoinClassModal
