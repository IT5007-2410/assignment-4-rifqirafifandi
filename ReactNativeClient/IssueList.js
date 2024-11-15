import React, {useState} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Button,
    useColorScheme,
    View,
  } from 'react-native';

  const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

  function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
  }

  async function graphQLFetch(query, variables = {}) {
    try {
        /****** Q4: Start Coding here. State the correct IP/port******/
        const response = await fetch('http://192.168.3.138:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
        /****** Q4: Code Ends here******/
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
  }

class IssueFilter extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          {/****** Q1: Start Coding here. ******/}
          <Text style = {styles.sectionHeadText}>Placeholder for IssueFilter</Text>
          {/****** Q1: Code ends here ******/}
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center' },
  sectionHeadText: { textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  input: { padding: 5, borderWidth: 1, borderColor: 'black', borderRadius: 5, marginBottom: 5 },
});

const width= [40,80,80,80,80,80,200];

function IssueRow(props) {
    const issue = props.issue;
    {/****** Q2: Coding Starts here. Create a row of data in a variable******/}
    const issueRow = [issue.id, 
      issue.status, 
      issue.owner, 
      issue.created ? issue.created.toDateString() : '', 
      issue.effort, 
      issue.due ? issue.due.toDateString() : '', 
      issue.title];
    {/****** Q2: Coding Ends here.******/}
    return (
      <>
      {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
      <Row data={issueRow} widthArr={width} style={styles.row} textStyle={styles.text}/>
      {/****** Q2: Coding Ends here. ******/}  
      </>
    );
  }
  
  
function IssueTable(props) {
  const issues = props.issues;
  const issueRows = issues.map(issue =>
    <IssueRow key={issue.id} issue={issue} />
  );
    
  {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/}
  const tableHeader = ['ID', 'Status', 'Owner', 'Created', 'Effort', 'Due', 'Title'];
  {/****** Q2: Coding Ends here. ******/}
    
    
  return (
    <View style={styles.container}>
    {/****** Q2: Start Coding here to render the table header/rows.**********/}
      <ScrollView horizontal={true}>
        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
          <Row data={tableHeader} widthArr={width} style={styles.header} textStyle={styles.text}/>
          {issueRows}
        </Table>
      </ScrollView>
    {/****** Q2: Coding Ends here. ******/}
    </View>
  );
}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    /****** Q3: Start Coding here. Create State to hold inputs******/
    this.state = {
      title: '',
      owner: '',
      status: 'New',
      effort: '',
      due: '',
    }
    /****** Q3: Code Ends here. ******/
  }
  
  /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
  setTitle(newTitle) {
    this.setState({ title: newTitle });
  }
  setOwner(newOwner) {
    this.setState({ owner: newOwner });
  }
  setStatus(newStatus) {
    this.setState({ status: newStatus });
  }
  setEffort(newEffort) {
    this.setState({ effort: newEffort });
  }
  setDue(newDue) {
    this.setState({ due: newDue });
  }
  /****** Q3: Code Ends here. ******/
    
  handleSubmit() {
    /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
    const issue = { title: this.state.title, owner: this.state.owner, status: this.state.status, effort: this.state.effort, due: this.state.due };
    this.props.createIssue(issue);
    
    // Clear input fields
    this.newTitleInput.clear();
    this.newOwnerInput.clear();
    this.newEffortInput.clear();
    this.newDueInput.clear();
    /****** Q3: Code Ends here. ******/
  }
  
  render() {
    return (
      <View style={styles.container}>
      {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <Text style = {styles.sectionHeadText}>Add an Issue</Text>
        <TextInput style = {styles.input} ref = {input => {this.newTitleInput = input;}} placeholder = "Title" onChangeText = {newTitle => this.setTitle(newTitle)}/>
        <TextInput style = {styles.input} ref = {input => {this.newOwnerInput = input;}} placeholder = "Owner" onChangeText = {newOwner => this.setOwner(newOwner)}/>
        <TextInput style = {styles.input} ref = {input => {this.newEffortInput = input;}} placeholder = "Effort" onChangeText = {newEffort => this.setEffort(newEffort)}/>
        <TextInput style = {styles.input} ref = {input => {this.newDueInput = input;}} placeholder = "Due (YYYY/MM/DD)" onChangeText = {newDue => this.setDue(newDue)}/>
        <Button title = "Submit" onPress = {this.handleSubmit}/>
      {/****** Q3: Code Ends here. ******/}
      </View>
    );
  }
}

class BlackList extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      /****** Q4: Start Coding here. Create State to hold inputs******/
      this.state = {
        name: '',
      }
      /****** Q4: Code Ends here. ******/
    }

    /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    setName(newOwner) {
      this.setState({ owner: newOwner });
    }
    /****** Q4: Code Ends here. ******/

    async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
      const query = `mutation addBlacklist($owner: String!) {
          addToBlacklist(nameInput: $owner) 
        }`;
      
      const data = await graphQLFetch(query, { owner: this.state.owner });

      // Clear input fields
      this.newOwnerInput.clear();

    /****** Q4: Code Ends here. ******/
    }

    render() {
    return (
        <View style={styles.container}>
          {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
          <Text style = {styles.sectionHeadText}>Add to Blacklist</Text>
          <TextInput style = {styles.input} ref = {input => {this.newOwnerInput = input;}} placeholder = "Owner" onChangeText = {newOwner => this.setName(newOwner)}/>
          <Button title = "Submit" onPress = {this.handleSubmit}/>
          {/****** Q4: Code Ends here. ******/}
        </View>
    );
    }
}

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: [],
      selector: 0,
    };
    this.createIssue = this.createIssue.bind(this);
  }
    
  componentDidMount() {
    this.loadData();
  }

  setSelector(selector) {
    this.setState({ selector });
  }

  async loadData() {
    const query = `query {
        issueList {
        id title status owner
        created effort due
        }
      }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ issues: data.issueList });
    }
  }

  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
          id
        }
      }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }
    
    
  render() {
    return (
    <ScrollView>
      {/* Selector Buttons for Navigation */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
        <Button title="Issue Filter" onPress={() => this.setSelector(1)} />
        <Button title="Issues" onPress={() => this.setSelector(2)} />
        <Button title="Add Issue" onPress={() => this.setSelector(3)} />
        <Button title="Blacklist" onPress={() => this.setSelector(4)} />
      </View>


      {/****** Q1: Start Coding here. ******/}
      {this.state.selector == 1 ? <IssueFilter/> : null}
      {/****** Q1: Code ends here ******/}

      {/****** Q2: Start Coding here. ******/}
      {this.state.selector == 2 ? <IssueTable issues={this.state.issues}/> : null}
      {/****** Q2: Code ends here ******/}

      {/****** Q3: Start Coding here. ******/}
      {this.state.selector == 3 ? <IssueAdd createIssue={this.createIssue} issues={this.state.issues}/> : null}
      {/****** Q3: Code Ends here. ******/}

      {/****** Q4: Start Coding here. ******/}
      {this.state.selector == 4 ? <BlackList/> : null}

      {/****** Q4: Code Ends here. ******/}
    </ScrollView>
      
    );
  }
}
