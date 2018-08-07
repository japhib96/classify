import React, {Component} from 'react';
//import { Navbar, Nav, NavItem, Glyphicon, ListGroupItem, ListGroup } from 'react-bootstrap';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import Modal from './modal.js'
import Teacher from './teacherView.js'


const btn ={
  backgroundColor: '#C9D7D8',
  fontSize: 25,
  fontFamily: 'Georgia',
  padding: 20,
  //margin: 3,
  border: 'solid',
  borderWidth: 2

};

export default class SideBarExample extends React.Component{
   state = { visible: false }
   handleButtonClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })


  render() {
    const { visible } = this.state
      return (
        <div>
        <Button onClick={this.handleButtonClick}><Icon name='content'/></Button>

        <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation='uncover'
          icon='labeled'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={visible}
          width='thin'
        >
          <Menu.Item as='a'>
            <Modal/>
            Create New
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='chat' />
            Chat
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='settings' />
            Settings
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
           <Segment size='massive' padded='very'>
            <Teacher/>
            <Teacher/>
           </Segment>
         </Sidebar.Pusher>
        </Sidebar.Pushable>

        </div>

        // <div class="w3-sidebar w3-bar-block" style={{width: 200}}>
        //   <ListGroup>
        //     <ListGroupItem style={btn} ><Glyphicon glyph="plus"/>  Create New</ListGroupItem>
        //     <ListGroupItem style={btn}><Glyphicon glyph="home"/>  Home</ListGroupItem>
        //     <ListGroupItem style={btn}>Logout</ListGroupItem>
        //     <ListGroupItem style={btn} href="#link"><Glyphicon glyph="cog"/> Settings</ListGroupItem>
        //   </ListGroup>
        // </div>


        // <div class="w3-sidebar w3-bar-block w3-collapse w3-card" style={{width: 200}} id="mySidebar">
        //   <button class="w3-bar-item w3-button w3-hide-large" onclick="w3_close()">Close &times;</button>
        //   <a href="#" class="w3-bar-item w3-button">Link 1</a>
        //   <a href="#" class="w3-bar-item w3-button">Link 2</a>
        //   <a href="#" class="w3-bar-item w3-button">Link 3</a>
        // </div>
        // <script>
        //   function w3_open() {
        //     document.getElementById("mySidebar").style.display = "block";
        //   }
        //   function w3_close() {
        //       document.getElementById("mySidebar").style.display = "none";
        //   }
        // </script>

            // <div align='left'>
            //   <ListGroup>
            //     <ListGroupItem>Create New</ListGroupItem>
            //     <ListGroupItem>Home</ListGroupItem>
            //     <ListGroupItem>Logout</ListGroupItem>
            //   </ListGroup>
            // </div>
      );
  }
}
