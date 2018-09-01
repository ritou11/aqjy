import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import './App.css';

const _ = require('lodash');
const tk = require('./res.json');

class ResultList extends Component {
  shouldCompomentUpdate(nextProps) {
    const { update } = nextProps;
    return update;
  }

  render() {
    const { results } = this.props;
    const listItems = results.map((re, index) => <ListItem key={re.toString()}>
      <TextField
        id="result"
        label={`Result#${index}`}
        multiline
        fullWidth
        value={re}/>
    </ListItem>);
    return <List>
      {listItems}
    </List>;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      res: [],
      update: false,
      more: false,
    };
  }

  _findKeyword() {
    const findres = _.filter(tk, (t) => t.indexOf(this.state.text) !== -1);
    const more = findres.length > 10;
    this.setState({
      res: findres.slice(0, 10),
      update: true,
      more,
    });
  }

  _textChange(e) {
    this.setState({
      text: e.target.value,
      update: false,
    });
  }

  _keyDown(e) {
    if (e.key === 'Enter') {
      this._findKeyword();
    }
  }

  _loadMore() {
    const findres = _.filter(tk, (t) => t.indexOf(this.state.text) !== -1);
    this.setState({
      res: findres,
      update: true,
      more: false,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Cheater For Aqjy</h1>
        </header>
        <div>
          <TextField
            id="text"
            label="Keyword"
            onChange={this._textChange.bind(this)}
            onKeyDown={this._keyDown.bind(this)} />
          <Button
            variant="contained"
            color="primary"
            onClick={this._findKeyword.bind(this)}>Find</Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={this._loadMore.bind(this)}
            disabled={!this.state.more}>More</Button>
        </div>
        <div>
          <ResultList
            results={this.state.res}
            style={{ width: '50vw' }} />
        </div>
      </div>
    );
  }
}

export default App;
