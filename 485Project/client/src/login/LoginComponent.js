import React from 'react';
import { Button, Form, FormGroup, Label, Input,Row, Col } from 'reactstrap';
import './login.css';


class LoginComponent extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickForget = this.clickForget.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.elements.username.value);
    console.log(event.target.elements.password.value);
  }
 clickForget(event) {
    this.props.history.push("/");
 }

  render(){
  return (

    <div className="container" style={{zIndex:10,opacity:0.85,boxShadow:"2px 2px 8px #424242"}} >
       <h1>LOGIN</h1>
      <Row >
        <Col>
          <Form  onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Username / Student ID</Label>
              <Input type="username" name="username" id="Username" placeholder="Username/Student ID" />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="password" id="Password" placeholder="Password" />
            </FormGroup>
            <FormGroup>
              <a href="/" onClick={this.clickForget}>forget password</a>
              <div className="left">
                <Button color="danger">Cancel</Button>
                <Button color="success" style={{marginLeft:'10px',width:120}}>Submit</Button>
                
              </div>
            </FormGroup>
          </Form>
        </Col>
      </Row>
     
    </div>

  );}
}

export default LoginComponent;