import React from 'react'
import { Icon, Button, Header, Image, Modal, Form, Checkbox } from 'semantic-ui-react'
import axios from 'axios';


class CreateClassModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classTitle: '',
      password: '',
      uploadFile: '',
      filePath: '',
      uploadName: '',
      lectureId: '',
      slideId: ''


    };
  }


  async saveClass() {
    var self = this;
    try {
      await axios.post('/saveClass', {
        classTitle: this.state.classTitle,
        password: this.state.password,
        owner: '5b71e7a768c4108fe464e55e'
      }).then( (res) =>{
        alert(`Class Successfully Created, your Class ID is: ${res.data.classId}`)
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
        <Modal.Header>Create A Class</Modal.Header>
        <Modal.Content>
        <Form>
            <Form.Field>
              <label>Class Name</label>
              <input placeholder='Class Name' onChange={ (e)=> this.setState({classTitle: e.target.value}) } />
            </Form.Field>
            <Form.Field>
              <label>Class Password</label>
              <input required placeholder='Class Password' onChange={ (e)=> this.setState({password: e.target.value}) }/>
            </Form.Field>
            <Modal.Actions centered>
            <Button type='submit' onClick={() => this.saveClass()}>Submit</Button>
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default CreateClassModal
