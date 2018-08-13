
import React, { Component } from 'react'
import axios from 'axios';
import { Grid, Menu, Segment, Icon, Header, Container } from 'semantic-ui-react'
import CardGroups from '../projectComponent';
import { Redirect } from 'react-router-dom';
// import AddButton from './AddModal';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import Headercomp from '../Headercomponent';
import Divider from '../divider';

library.add(faCheckSquare, faCoffee, faGraduationCap)


export default class Classroom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      lectures: null,
      title: ''
    }
  }

  componentDidMount() {
    console.log(this.props.classId)
    this.getLectures();
  }

  async getLectures() {
    let lectures;
    let title;
    // const self = this;
    await axios.post('/class/lectures', {
      classId: this.props.classId
    })
    .then((resp) => {
      lectures = resp.data.lectures;
      title = resp.data.title;
    });
    console.log(lectures)
    this.setState({ lectures, title, loading: false })
  }



  render() {
    if (this.state.loading) { return <h2>Retrieving Lectures...</h2> }
    if (this.props.lecture) { return <Redirect to='/student/lecture' />}

    return (
      <div>
      <Headercomp title={this.state.title}
      description={'This is the class homepage. You can view past lectures or join live ones'}/>
      <div style={{height: '86.2%'}}>
        <Grid columns={2} doubling stretched className="style" >
            <Grid.Column className="style" stretched width={4} floated='left' >
              <Container>
                <Grid columns={1} centered  textAlign="center" verticalAlign="middle">
                  <Grid.Row className="menu style" color="pink" width={4} verticalAlign="middle" >
                    <Container textAlign="center" className="user dashboard menu">
                      <FontAwesomeIcon icon="graduation-cap" size="3x" /> <h2>Classes</h2>
                    </Container>
                  </Grid.Row>
                  <Grid.Row className="menu style" color="pink" width={4} verticalAlign="middle" >
                    <Container textAlign="center" className="user dashboard menu">
                      <FontAwesomeIcon icon="graduation-cap" size="3x" /> <h2>Classes</h2>
                    </Container>
                  </Grid.Row>
                  <Grid.Row className="menu style" color="pink" width={4} verticalAlign="middle" >
                    <Container textAlign="center" className="user dashboard menu">
                      <FontAwesomeIcon icon="graduation-cap" size="3x" /> <h2>Classes</h2>
                    </Container>
                  </Grid.Row>
                </Grid>
              </Container>
            </Grid.Column>
            <Grid.Column stretched width={12} floated="right" color="blue" className="style">
              <Container>
                <Grid>
                {
                  this.state.lectures.map((lecture) => {
                    return (
                      <Grid.Column className="dashboard style" width={4}>
                        <CardGroups title={lecture.lectureTitle} setLecture={this.props.setLecture} lectureId={lecture._id} />
                      </Grid.Column>
                    )
                  })
                }
                </Grid>
              </Container>
            </Grid.Column>
        </Grid>
      </div>
    </div>
    )
  }
}
