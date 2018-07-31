import React from 'react';
import {
  Navbar ,
  FormControl,
  FormGroup,
  Button
 } from 'react-bootstrap';


export default class Navigationbar extends React.Component {

  render() {
    return (
      <Navbar className="show-grid" xs={12} md={8}>
        <Navbar.Header xs={12} md={8}>
          <Navbar.Brand>
            <a>Classify</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>{' '}
            <Button type="submit">Submit</Button>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
