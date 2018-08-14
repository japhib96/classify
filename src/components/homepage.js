import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import image from '../images/chalk.jpg'
import image1 from '../images/lecture.jpg'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

const HomepageHeading = ({ mobile }) => (

  <div style={{backgroundImage: `url(${image})`, height: 600}}>
    <Container text>
      <Header
        as='h1'
        content='Classify'
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '3em',
        }}
      />
      <Header
        as='h2'
        content='Resourceful, Reliable, Realtime lecture feedback'
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1.5em',
        }}
      />
      <Link to={'/register'}>
      <Button primary size='huge'>
        Get Started
        <Icon name='right arrow' />
      </Button>
      </Link>
    </Container>
  </div>

)


HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>

                <Menu.Item position='right'>
                  <Link to={'/login'}>
                  <Button as='a' inverted={!fixed}>
                    Log in
                  </Button>
                  </Link>
                  <Link to={'/register'}>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                  </Link>
                </Menu.Item>
              </Container>
            </Menu>

              <HomepageHeading />

          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>


          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: '100vh' }}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Link to={'/login'}>
                    <Button as='a' inverted>
                      Log in
                    </Button>
                    </Link>
                    <Link to={'/register'}>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                    </Link>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Designed to help students and professors alike!
            </Header>
            <p style={{ fontSize: '1.33em' }}>

            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Check out our video demonstration!
            </Header>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src='../images/lecture.jpg' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='huge'>Check Them Out</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='left'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              <u>Our Story</u>
            </Header>
            <p style={{ fontSize: '1.33em' }}>
                As students at accredited universities our founders have noticed the lack of
                communication between students and professors during class.
                This often leads to less student engagement and interest.
                If students are able to give live feedback to professors and ask
                questions they are stumped on without interrupting the flow of the class,
                then our belief is that the learning process for students will become more active. 
           </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              <u>Our Vision</u>
            </Header>
            <p style={{ fontSize: '1.33em'}}>
            Simply put we see a future where students can easily have their questions answered and professors can have a better understanding of their class. As well as a world where participation counts. Professors will be able to keep track of student participation on our platform to include in distributing participation grades. 
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
  <Container>
    <Grid divided inverted stackable>
    <Header as='h3' inverted>
      Contact Info:
    </Header>
      <Grid.Row>
          <Grid.Column width={3}>

            <b>
              Andrew Kirk:
            </b>
            <Grid.Column>
              Email: akirk@texas.edu
            </Grid.Column>
            <Grid.Column>
              Phone: (210)-488-7820
            </Grid.Column>
          </Grid.Column>

          <Grid.Column width={4}>

            <b>
              Japhi Biedermann:
            </b>
            <Grid.Column>
              Email: jp.biedermann@unc.edu
            </Grid.Column>
            <Grid.Column>
              Phone: (415)-264-7102
            </Grid.Column>
          </Grid.Column>
          <Grid.Column width={4}>

            <b>
              Kavi Munjal:
            </b>
            <Grid.Column>
              Email: kmunjal@wharton.edu
            </Grid.Column>
            <Grid.Column>
              Phone: (856)-979-6764
            </Grid.Column>
          </Grid.Column>
          <Grid.Column width={4}>

            <b>
              Sam Schweber:
            </b>
            <Grid.Column>
              Email: sjschweber@brandeis.edu
            </Grid.Column>
            <Grid.Column>
              Phone: (781)-296-1202
            </Grid.Column>
          </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)
export default HomepageLayout
