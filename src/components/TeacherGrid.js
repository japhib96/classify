import Divider from './divider';
import Headercomp from './Headercomponent';
import React from 'react'
import { Grid, Container} from 'semantic-ui-react'
import Comment from './Comments';
import Statistics from './ClassStatistics';
import Navigationbar from './Navbar';
import io from 'socket.io-client';
import Slides from './PDFViewer';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faGraduationCap, faQuestion, faChartLine } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckSquare, faCoffee, faGraduationCap, faQuestion, faChartLine)



export default class TeacherInterface extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        message: '',
      };

      var self = this;

      this.socket = io('localhost:3001');


      this.sendMessage = ev => {
        ev.preventDefault();
        if (ev.key === 'Enter') {
          this.socket.emit('SEND_MESSAGE', {
            author: this.props.user.username,
            message: this.state.message,
            class: this.props.class
          });
          this.setState({
            message:""
          })
        }
      }
    }

    showPicker = (emojiCode, emojiObj) => {
      console.log(emojiCode,emojiObj);
    }

    render() {
      return (
        <div className="teacher grid">
          <div className="left col">
            <div>
              <Container textAlign="center" className="user dashboard menu">
                <FontAwesomeIcon icon="graduation-cap" size="3x" /> <h2>Classes</h2>
              </Container>
            </div>
            <div>
              <Container textAlign="center" className="user dashboard menu">
                <FontAwesomeIcon icon="question" size="3x" /> <h2>View Top Questions</h2>
              </Container>
            </div>
            <div>
              <Container textAlign="center" className="user dashboard menu">
                <FontAwesomeIcon icon="chart-line" size="3x" /> <h2> Class Statistics</h2>
              </Container>
            </div>
              <Statistics  user={this.props.user} class={this.props.class} />
          </div>
          <div className="right col">
            <Slides  class={this.props.class}/>
          </div>
          {/* <Grid columns='equal'>
              <Grid.Column stretched>

              </Grid.Column>
              <Grid.Column width={8} stretched>
                <Grid.Row className="usergrid">

                </Grid.Row>
                <Grid.Row className="grid">
                  <Grid columns='equal' >
                    <Grid.Column width={12}>
                      <Slides  class={this.props.class}/>
                    </Grid.Column>
                    <Grid.Column width={2}>

                    </Grid.Column>
                  </Grid>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column>

              </Grid.Column>
          </Grid> */}
        </div>
      );
    }
  }
