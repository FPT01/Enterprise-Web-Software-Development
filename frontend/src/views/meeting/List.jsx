/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";

import { Modal, Form, Dropdown, Input, TextArea, Label, Button, Divider } from 'semantic-ui-react'

import TimeRange from 'react-time-range';
import moment from 'moment';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

class UserRole extends Component {
  calendarComponentRef = React.createRef()
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      calendarWeekends: true,
      calendarEvents: [ // initial event data
        { title: 'Event Now', start: new Date() },
      ]
    }
  }

  componentDidMount() {

  }
  toggleWeekends = () => {
    this.setState({ // update a property
      calendarWeekends: !this.state.calendarWeekends
    })
  }

  handleDateClick = (arg) => {
    console.log(arg)
    this.setState({ openModal: true })
    this.setState({  // add new event data
      calendarEvents: this.state.calendarEvents.concat({ // creates a new array
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay
      })
    })

  }
  closePopup = () => {
    this.setState({ openModal: false })
  }

  render() {
    return (
      <div className="content" >
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Here is a list of allocated class"
                category=""
                ctTableFullWidth
                ctTableResponsive
                content={
                  <>
                    <div className="meeting">
                      <FullCalendar
                        defaultView="dayGridMonth"
                        header={{
                          left: 'prev,next today',
                          center: 'title',
                          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                        }}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        ref={this.calendarComponentRef}
                        weekends={this.state.calendarWeekends}
                        events={this.state.calendarEvents}
                        dateClick={this.handleDateClick}
                      />

                    </div>
                    <Modal open={this.state.openModal} onClose={this.closePopup}>
                      <Modal.Header>Add new Event</Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          <Form>
                            <Form.Field>
                              <Label>Title</Label>
                              <Input placeholder='Search...' />
                            </Form.Field>
                            <Form.Field>
                              <Label>Description</Label>
                              <TextArea placeholder='Tell us more' />
                            </Form.Field>
                            <Form.Field>
                              <Label>Event type</Label>
                              <Dropdown
                                placeholder='Class'
                                fluid
                                selection
                                search
                                onChange={this.onChangeRoom}
                                options={[{ key: '1', text: 'Type 1', value: 1 }, { key: '2', text: 'Type 2', value: 2 },]}
                                value={this.state.selectedRoom}
                              />
                            </Form.Field>
                            <Form.Field>
                              <Label>Time range</Label>
                              <TimeRange
                                startLabel=" Start"
                                endLabel="End"
                                startMoment={this.state.startTime}
                                endMoment={this.state.endTime}
                                onChange={this.returnFunction}
                              />
                            </Form.Field>

                            <Form.Field>
                              <Label>Participants</Label>
                              <Dropdown
                                placeholder='Class'
                                fluid
                                selection
                                multiple
                                search
                                onChange={this.onChangeRoom}
                                options={[{ key: '1', text: 'Type 1', value: 1 }, { key: '2', text: 'Type 2', value: 2 },]}
                                value={this.state.selectedRoom}
                              />
                            </Form.Field>
                            <Form.Field>
                              <Label>Note</Label>
                              <TextArea placeholder='Tell us more' />
                            </Form.Field>
                            <Button color='blue' onClick={this.saveAllocate}>Save</Button>
                            <Button color='red' onClick={this.resetAllField}>Reset</Button>
                          </Form>

                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
                  </>
                }
              />
            </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}

export default UserRole;
