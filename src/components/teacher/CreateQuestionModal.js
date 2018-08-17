import React from 'react'
import { Icon, Button, Header, Image, Modal, Form, Checkbox, Message, Input, List } from 'semantic-ui-react'
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
      redirect: false,
      loading2: false
    };
  }

  sendQuestion() {
    this.setState({
      loading2: true
    })
    this.props.socket.emit('TEACHER_QUESTION', {
      question: this.state.question,
      options: this.state.options,
      lectureId: this.props.lectureId
    })
    this.setState({ question: '', options: [], numOptions: 1, optionInput: '', loading2: false})
    this.handleClose()
  }

  handleClose = () => this.setState({ modalOpen: false })

  handleOpen = () => this.setState({ modalOpen: true })




  render() {

    var name = this.state.uploadName
    console.log(this.props.socket)
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen} style={{height: "70vh", marginLeft: "0.3em",padding:"0em", alignItems:"center", backgroundColor:"#82ecff"}}>
          <Icon bordered circular size="large" name='add circle' aria-label='Add circle'/> <br></br> Create a Questionaire</Button>}
          centered={false} size="large"
          open={this.state.modalOpen}
          onClose={()=>this.handleClose()}>

          <Modal.Header>Create a Questionaire</Modal.Header>
          <Modal.Content>
            <Message>
              <Message.Header>Create Interactive Lecture Sessions</Message.Header>
              <p>
                Create customized Questionaires and Feedback sessions. Use this interface to customize your questions. Questions will be displayed on the student side in real time and they will
                be able to respond to them.
              </p>
            </Message>

            <Form className="question form">
              <div className="send option">
                <Button loading={this.state.loading2} className="send" onClick={() => this.sendQuestion()}>Display Question to Students</Button>
              </div>
              <Form.Field width="16">
                <label>Question</label>
                <input placeholder='Question' onChange={(e)=> this.setState({ question: e.target.value })} />
              </Form.Field>
              <Form.Field width="16" >
                <label>Add Option</label>
                <Input placeholder={'Option ' + this.state.numOptions} value={this.state.optionInput} onChange={(e)=> this.setState({ optionInput: e.target.value })}/>
                <div className="add option">
                  <Button className="add" type='submit' onClick={() => this.setState({ options: [...this.state.options, this.state.optionInput], optionInput: '', numOptions: this.state.numOptions + 1 })}>Add Option</Button>
                </div>
                <h2 className="answer options">Answer Options</h2>
                <div className="answer options">
                  {this.state.options.map((option, index) => {
                    const num = index + 1;
                    return(
                      <List>
                        <List.Item>{num + '. ' + option}</List.Item>
                      </List>
                    )
                      }
                    )
                  }
                </div>
            </Form.Field>
            <Modal.Actions centered>
            </Modal.Actions>
          </Form>
        </Modal.Content>

      </Modal>
    );
  }
}

export default CreateQuestionModal
