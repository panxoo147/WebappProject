import React from 'react';
import Cards from '../Course/Cards'
import { Form,FormControl,Container,Col,Row,Collapse} from 'react-bootstrap';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course:[]
        }
    }

    componentDidMount(){
        fetch('/courseList')
        .then(res => res.json())
        .then(course => { 
            this.setState({course})
         })
    }

    render() { 
        let CourseCard = this.state.course.filter( data => {
            if(data.Rank>4)
                return data
            else
                return null
            
     }).map(course => {
                return (
                    <Col key={course.CourseID} sm="3" style={{paddingBottom:10}} >
                        <Cards course={course}/>
                    </Col>
                )
    })
        return (  
            <div >
                <div style={{marginTop:55}}>
                <h1>Most Popular</h1>
                <Container fluid>
                    <Row style={{marginTop:50}}>
                    {CourseCard}
                    </Row>
               </Container>
                </div>
            </div>


        );
    }
}
 
export default Home;