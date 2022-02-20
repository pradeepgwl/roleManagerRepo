import React, { Component } from 'react';
 import './index.css';
 // Bootstrap components
 import { Card, Button, CardTitle, CardText, Row, Col, Table } from 'reactstrap'
 // Importing GetEmployee file
 import PermissionManager from './components/permission-manager';
 
 class App extends Component {
 render() {
 return (
 <div className="App">
 <div className="docs-example">
 <h1 className="post_heading">Role Management</h1>
 <Row>
 <Col sm="12">
 {/* Includeing re-usable component */}
 <PermissionManager />
 </Col>
 </Row>
 </div>
 </div>
 );
 }
 }
 export default App;