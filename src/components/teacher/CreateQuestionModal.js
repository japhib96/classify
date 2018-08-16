import React from 'react'
import { Icon, Button, Header, Image, Modal, Form, Checkbox } from 'semantic-ui-react'
import axios from 'axios';
import Dropzone from 'react-dropzone'
import io from "socket.io-client";
import PDF from 'react-pdf-js';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

class CreateQuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      optionInput: '',
      options: [],
      numOptions: 1,
      modalOpen: false,
      redirect: false
    };
  }

  sendQuestion() {
    this.props.socket.emit('TEACHER_QUESTION', {
      question: this.state.question,
      options: this.state.options,
      class: this.props.lectureId
    })
  }

    handleClose = () => this.setState({ modalOpen: false })
    handleOpen = () => this.setState({ modalOpen: true })




  render() {

    var name = this.state.uploadName
    console.log(this.props.socket)
    return (
      <Modal trigger={<Icon bordered circular size="big" name='add circle' onClick={this.handleOpen} aria-label='Add circle'/>} centered={false} size="large" open={this.state.modalOpen} onClose={()=>this.handleClose()} >
        <Modal.Header>Create A Lecture</Modal.Header>
        <Modal.Content>
        <Form>
            <Form.Field>
              <label>Question</label>
              <input placeholder='Question' onChange={(e)=> this.setState({ question: e.target.value })} />
            </Form.Field>
            <Form.Field>
              <label>Answer options</label>
              {this.state.options.map((option, index) => {
                const num = index + 1;
                return <div>{num + '. ' + option}</div>
              })}
              <input placeholder={'Option ' + this.state.numOptions} value={this.state.optionInput} onChange={(e)=> this.setState({ optionInput: e.target.value })}/>
              <Button type='submit' onClick={() => this.setState({ options: [...this.state.options, this.state.optionInput], optionInput: '', numOptions: this.state.numOptions + 1 })}>Add</Button>
            </Form.Field>
            <Button type='submit' onClick={() => this.sendQuestion()}>Send Question</Button>
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

export default CreateQuestionModal
