import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { Tab, TabBar, TabBody, H1 } from "./style/styles";
import { Code } from "./components/code";
import { User } from "./components/user";
import { CsvLoader } from "./components/csvLoader";

axios.defaults.headers.common["x-api-key"] =
  "5E8mftCnJ92ttL71HKepv5XjgumUufxc5Y9We6n1";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }
  onSelect = selected => () => {
    this.setState({ selected });
  };
  render() {
    const { selected } = this.state;
    return (
      <div>
        <H1>
          <div>Ordre Sifonique</div>
          <div> - </div>
          <div>admin</div>
        </H1>
        <TabBar>
          <Tab onClick={this.onSelect(0)} selected={selected === 0}>
            Création de codes
          </Tab>
          <Tab onClick={this.onSelect(1)} selected={selected === 1}>
            Ajout de pseudo
          </Tab>
          <Tab onClick={this.onSelect(2)} selected={selected === 2}>
            Chargement des scores
          </Tab>
        </TabBar>
        <TabBody>
          {selected === 0 && <Code />}
          {selected === 1 && <User />}
          {selected === 2 && <CsvLoader />}
        </TabBody>
      </div>
    );
  }
}

export default App;
