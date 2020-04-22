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

import DayPickerInput from 'react-day-picker/DayPickerInput';
import TimeRange from 'react-time-range';
import moment from 'moment';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/it';

class UserRole extends Component {
  calendarComponentRef = React.createRef()
  constructor(props) {
    super(props);
    this.state = {
      allEvents: [],
      allEventTypes: [],
      allStudents: [],
      allTutors: [],

      eventType: '',
      eventTitle: '',
      eventDescription: '',
      eventDate: '',
      eventStartTime: '',
      eventEndTime: '',
      eventTutors: [],
      eventStudents: [],

      initEventType: '',
      initEventTitle: '',
      initEventDescription: '',
      initEventDate: '',
      initEventStartTime: '',
      initEventEndTime: '',
      initEventTutors: [],
      initEventStudents: [],

      openModal: false,
      calendarWeekends: true
    }
  }

  componentDidMount() {
    this.fnGetEventTypes();
    this.fnLoadEvents();
    this.fnGetTutors();
    this.fnGetStudents();
  }

  onSaveEvent = () => {
    const title = this.state.eventTitle
    const description = this.state.eventDescription
    const type = this.state.eventType
    const startTime = `${(new Date(this.state.eventDate)).toISOString().substring(0, 10)}@${(new Date(this.state.eventStartTime)).toTimeString().substring(0, 8)}.000+0000`
    const endTime = `${(new Date(this.state.eventDate)).toISOString().substring(0, 10)}@${(new Date(this.state.eventEndTime)).toTimeString().substring(0, 8)}.000+0000`
    const studentDTOS = this.state.eventStudents.map(i => ({ id: i }))
    const tutorDTOS = this.state.eventTutors.map(i => ({ id: i }))
    console.log(JSON.stringify({ title, description, type, startTime, endTime, studentDTOS, tutorDTOS }))

    fetch(`http://localhost:8080/api/meeting/save`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, type, startTime, endTime, studentDTOS, tutorDTOS })
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.status === "OK") {
          window.location.href = "/admin/meeting";
        } else {
          console.log("error");
        }
      })
  }



  fnGetTutors = () => {
    fetch(`http://localhost:8080/api/tutor/`, {
      method: "GET",
    })
      .then(response => response.json())
      .then(data => data.map(({ id, user }) => ({ key: id, text: user.fullname, value: id })))
      .then(data => {
        this.setState({ allTutors: data });
      });
  }
  fnGetStudents = () => {
    fetch(`http://localhost:8080/api/student/`, {
      method: "GET",
    })
      .then(response => response.json())
      .then(data => data.map(({ id, user }) => ({ key: id, text: user.fullname, value: id })))
      .then(data => {
        this.setState({ allStudents: data });
      });

  }

  fnLoadEvents = () => {
    fetch(`http://localhost:8080/api/meeting/`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        data.map(({ id, title, description, type, startTime, endTime, studentDTOS, tutorDTOS }) => {
          this.setState({  // add new event data
            allEvents: this.state.allEvents.concat({
              id: id,
              title: title,
              start: new Date(startTime),
              end: new Date(endTime),
              description: description,
              extendedProps: {
                type: type,
                studentDTOS: studentDTOS.map(({ id }) => id),
                tutorDTOS: tutorDTOS.map(({ id }) => id),
              }
            })
          })
        })
      })
  }

  onClickDate = (arg) => {

    this.setState({
      eventType: '',
      eventTitle: 'New meeting about ',
      eventDescription: '',
      eventDate: arg.date,
      eventStartTime: new Date(),
      eventEndTime: Date.now(),
      eventTutors: [],
      eventStudents: [],

      initEventType: '',
      initEventTitle: 'New meeting about ',
      initEventDescription: '',
      initEventDate: arg.date,
      initEventStartTime: new Date(),
      initEventEndTime: Date.now(),
      initEventTutors: [],
      initEventStudents: [],

      openModal: true,
    })
  }

  onclickEvent = ({ event }) => {
    console.log('etende', event.extendedProps)

    const { title, start, end, extendedProps } = event
    this.setState({
      eventType: extendedProps.type,
      eventTitle: title,
      eventDescription: extendedProps.description,
      eventDate: new Date(start),
      eventStartTime: new Date(start),
      eventEndTime: new Date(end),
      eventTutors: extendedProps.tutorDTOS,
      eventStudents: extendedProps.studentDTOS,

      initEventType: extendedProps.type,
      initEventTitle: title,
      initEventDescription: extendedProps.description,
      initEventDate: new Date(start),
      initEventStartTime: new Date(start),
      initEventEndTime: new Date(end),
      initEventTutors: extendedProps.tutorDTOS,
      initEventStudents: extendedProps.studentDTOS,

      openModal: true
    })
  }
  onResetEvent = () => {
    this.setState({
      eventType: this.state.initEventType,
      eventTitle: this.state.initEventTitle,
      eventDescription: this.state.initEventDescription,
      eventDate: this.state.initEventDate,
      eventStartTime: this.state.initEventStartTime,
      eventEndTime: this.state.initEventEndTime,
      eventTutors: this.state.initEventTutors,
      eventStudents: this.state.initEventStudents,
    })

  }

  onClosePopup = () => this.setState({ openModal: false })
  fnGetEventTypes = () => this.setState({
    allEventTypes: [{ key: '1', text: 'Virtual', value: 'Virtual' }, { key: '2', text: 'Real', value: 'Real' },]
  })
  onChangeEventTitle = (e, { value }) => this.setState({ eventTitle: value })
  onChangeEventDescription = (e, { value }) => this.setState({ eventDescription: value })
  onChangeEventType = (e, { value }) => this.setState({ eventType: value })
  onChangeEventDate = (day) => this.setState({ eventDate: day })
  onChangeEventTime = ({ startTime, endTime }) => this.setState({ eventStartTime: startTime, eventEndTime: endTime })
  onChangeEventStudents = (e, { value }) => this.setState({ eventStudents: value })
  onChangeEventTutors = (e, { value }) => this.setState({ eventTutors: value })

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
                        events={this.state.allEvents}
                        dateClick={this.onClickDate}
                        eventClick={this.onclickEvent}
                      />

                    </div>
                    <Modal open={this.state.openModal} onClose={this.onClosePopup}>
                      <Modal.Header>Add New Meeting</Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          <Form>
                            <Form.Field>
                              <Label>Title</Label>
                              <Input
                                placeholder='Event title'
                                value={this.state.eventTitle}
                                onChange={this.onChangeEventTitle}
                              />
                            </Form.Field>
                            <Form.Field>
                              <Label>Description</Label>
                              <TextArea
                                placeholder='Event description'
                                value={this.state.eventDescription}
                                onChange={this.onChangeEventDescription}
                              />
                            </Form.Field>
                            <Form.Field>
                              <Label>Meeting type</Label>
                              <Dropdown
                                placeholder='Class'
                                fluid
                                selection
                                search
                                onChange={this.onChangeEventType}
                                options={this.state.allEventTypes}
                                value={this.state.eventType}
                              />
                            </Form.Field>
                            <Form.Field>
                              <Label>Meeting date</Label>
                              <div>
                                <DayPickerInput
                                  onDayChange={this.onChangeEventDate}
                                  formatDate={formatDate}
                                  parseDate={parseDate}
                                  placeholder={`${formatDate(new Date())}`}
                                  value={this.state.eventDate}
                                />
                              </div>

                            </Form.Field>
                            <Form.Field>
                              <Label>Meeting time</Label>
                              <TimeRange
                                startLabel=""
                                endLabel=""
                                startMoment={this.state.eventStartTime}
                                endMoment={this.state.eventEndTime}
                                onChange={this.onChangeEventTime}
                              />
                            </Form.Field>

                            <Form.Field>
                              <Label>Tutor</Label>
                              <Dropdown
                                placeholder='Class'
                                fluid
                                selection
                                multiple
                                search
                                onChange={this.onChangeEventTutors}
                                options={this.state.allTutors}
                                value={this.state.eventTutors}
                              />
                            </Form.Field>
                            <Form.Field>
                              <Label>Student</Label>
                              <Dropdown
                                placeholder='Class'
                                fluid
                                selection
                                multiple
                                search
                                onChange={this.onChangeEventStudents}
                                options={this.state.allStudents}
                                value={this.state.eventStudents}
                              />
                            </Form.Field>
                            <Button color='blue' onClick={this.onSaveEvent}>Save</Button>
                            <Button color='red' onClick={this.onResetEvent}>Reset</Button>
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
