import React from 'react'
import { Icon, Button, Header, Image, Modal, Form, Checkbox } from 'semantic-ui-react'

const AddModal = () => (


  <Modal trigger={<Icon bordered circular size="huge" name='add circle' aria-label='Add circle'/>} centered={false} size="large">
    <Modal.Header>Add a Session</Modal.Header>
    <Modal.Content>
    <Form>
        <Form.Field>
          <label>Document Name</label>
          <input placeholder='Document Name' />
        </Form.Field>
        <Form.Field>
          <label>Document Code</label>
          <input required placeholder='Document Code' />
        </Form.Field>
        <Modal.Actions centered>
        <Button type='submit' onClick={this.handleClose}>Submit</Button>
        </Modal.Actions>
      </Form>
    </Modal.Content>
  </Modal>
)

export default AddModal
