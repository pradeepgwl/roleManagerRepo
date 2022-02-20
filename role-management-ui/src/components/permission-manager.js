import React, { Component } from 'react';
 import { connect } from 'react-redux';
 import { Card, Button, CardTitle, CardText, Row, Col, Table } from 'reactstrap';
 import { getPermissionData, setPermissionData, savePermissionData} from '../redux/actions/actions';
 
 class PermissionManager extends Component {
 constructor(props) {
 super(props);
 this.state = {
    dataToPost: []
 }
 }
 
 // To call get api of employee using actions file
 componentDidMount() {
 this.props.getPermissionData();
 }
 editDetails = (data) => {
    var tasks;
    if(this.state.dataToPost?.some(task => task.taskId === data.taskId)){
        tasks = this.state.dataToPost.filter(task => task.taskId !== data.taskId);        
    }
    if(tasks){
        tasks.push(data);
        this.setState({dataToPost: tasks});
    }
    else{
        this.state.dataToPost.push(data); 
    }
        
    this.props.setPermissionData(data);
  } 
  
  saveDetails = () => {    
    this.props.savePermissionData(this.state.dataToPost);
    this.setState({dataToPost: []});
  } 
 // To render the list of employee
 render() {
 const permission = this.props.permissionData;
 console.log(permission);
 return (
     <div align="right" style={{border: '2px solid',  padding: 10, margin: 10 }}>
         <Button onClick={() => this.saveDetails()} >Save Changes</Button>
     <div>
     <div style={{border: '2px solid',  padding: 10, margin: 10 }}>
 {
 Object.keys(permission).map((key, i) => (
    <Table dark >
    <thead>
    <tr>
    <th>#</th>
    <th>{key}</th>
    <th>Product Administrator</th>
    <th>Engineer</th>
    </tr>
    </thead>
    <tbody>
    {permission[key].map((task) => (
    <tr key={task.taskId}>
    <th scope="row">{task.taskId}</th>
    <td>{task.taskName}</td>
    <td><input type="checkbox" checked={task.asProductAdministrator} onClick={() => this.editDetails({key: key, taskId: task.taskId, asProductAdministrator: !task.asProductAdministrator, asEngineer: task.asEngineer})}></input></td>
    <td><input type="checkbox" checked={task.asEngineer} onClick={() => this.editDetails({key: key, taskId: task.taskId, asProductAdministrator: task.asProductAdministrator, asEngineer: !task.asEngineer})}></input></td>
    </tr>
    ))}
     </tbody>
     </Table>    
 ))}
 </div>
 </div>
 </div>
 );
 }
 }

 
 // Mapping of state to props to use it locally in this file
 const mapStateToProps = (state) => {
 return { permissionData: state.permissionData }
 }
 // Connecting this file with redux
 export default connect(mapStateToProps, { getPermissionData, setPermissionData, savePermissionData })(PermissionManager);