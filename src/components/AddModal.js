import React from 'react'
import { Icon, Button, Header, Image, Modal, Form, Checkbox } from 'semantic-ui-react'
import axios from 'axios';


class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lectureTitle: '',
      password: ''

    };
  }

  async saveLecture() {
    console.log('entered save lecture')
    try {
      await axios.post('/saveLecture', {
        classId : this.props.class,
        lectureTitle: this.state.lectureTitle,
        password: this.state.password
      })
      console.log('classroom saved')
    }
    catch(error) {
      console.log('catch', error);
    }
  }



  render() {

    return (
      <Modal trigger={<Icon bordered circular size="huge" name='add circle' aria-label='Add circle'/>} centered={false} size="large">
        <Modal.Header>Add a Session</Modal.Header>
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
            <Modal.Actions centered>
            <Button type='submit' onClick={() => this.saveLecture()}>Submit</Button>
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}



export default AddModal
