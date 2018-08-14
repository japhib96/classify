import React from 'react'
import { Icon, Button, Header, Image, Modal, Form, Checkbox } from 'semantic-ui-react'

const ModalExampleTopAligned = () => (


  <Modal trigger={<Icon name='add circle'/>} centered={false}>
    <Modal.Header>New Lecture</Modal.Header>
    <Modal.Content>
    <Form>
        <Form.Field>
          <label>First Name</label>
          <input placeholder='First Name' />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input required placeholder='Last Name' />
        </Form.Field>
        <Form.Field>
          <label>Lecture Title</label>
          <input required placeholder='title'/>
        </Form.Field>
        <Form.Field>
          <label>Date Created</label>
          <input required type='date'/>
        </Form.Field>
        <Modal.Actions>
        <Button type='submit' onClick={this.handleClose}>Submit</Button>
        </Modal.Actions>
      </Form>
    </Modal.Content>
  </Modal>
)

export default ModalExampleTopAligned
