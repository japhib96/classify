import Divider from './divider';
import Headercomp from './Headercomponent';
import React from 'react'
import { Grid, Segment, Sticky, TextArea, Form, Button, Icon, Popup} from 'semantic-ui-react'
import Comment from './Comments';
import Emotions from './EmotionBar';
import Statistics from './ClassStatistics';
import Navigationbar from './Navbar';
import io from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';

//
// getEmoji = () => {
//
// }


export default class UserInterface extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        message: '',
      };

      var self = this;

      this.socket = io('localhost:3001');

      this.sendMessage = ev => {
        ev.preventDefault();
        this.socket.emit('SEND_MESSAGE', {
          author: this.state.username,
          message: this.state.message
        });
        this.setState({message: ''});
      }
    }

    render() {
      return (
        <div>
          <Grid columns='equal' >
              <Grid.Column>
                  <Statistics />
              </Grid.Column>
              <Grid.Column width={8} stretched>
                <Grid.Row className="usergrid">
                  <Comment />
                </Grid.Row>
                <Grid.Row className="grid">
                  <Grid columns='equal' >
                    <Grid.Column width={12}>
                      <Form>
                        <TextArea type="submit" onSubmit={() => this.sendMessage() } autoHeight placeholder='Type somehting' rows={1} style={{backgroundColor:'white', borderRadius: '15px', padding: '10px', outline:'none'}} unstackable/>
                      </Form>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <Popup  on='click' trigger={<Button icon='add' circular />} content={<EmojiPicker  />} />
                    </Grid.Column>
                  </Grid>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column>
                  <Emotions />
              </Grid.Column>
          </Grid>
        </div>
      );
    }
  }




// import _ from 'lodash'
// import React, { Component } from 'react'
// import { Grid, Header, Image, Rail, Segment, Sticky } from 'semantic-ui-react'
//
//
//
// export default class StickyExampleAdjacentContext extends Component {
//   state = {}
//
//   handleContextRef = contextRef => this.setState({ contextRef })
//
//   render() {
//     const { contextRef } = this.state
//
//     return (
//       <Grid centered columns='equal' className="usergrid">
//         <Grid.Column>
//           <div ref={this.handleContextRef}>
//             <Segment>
//               <Segment>
//                 <Statistics />
//               </Segment>
//               <Rail position='left'>
//
//
//                 <Sticky context={contextRef}>
//                   <Header as='h3'>Stuck Content</Header>
//                 </Sticky>
//               </Rail>
//
//               <Rail position='right'>
//                 <Sticky context={contextRef}>
//                   <Header as='h3'>Stuck Content</Header>
//                 </Sticky>
//               </Rail>
//             </Segment>
//           </div>
//         </Grid.Column>
//       </Grid>
//     )
//   }
// }
