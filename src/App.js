import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import styled from "styled-components";

axios.defaults.headers.common["x-api-key"] =
  "5E8mftCnJ92ttL71HKepv5XjgumUufxc5Y9We6n1";

const mainColor = "#600060";
const lightColor = "#a800a8";
const bkgColor = "#ffffff";
const inputColor = "#f8f8f8";
const inputFocusColor = "#e8e8e8";

const H1 = styled.h1`
  font-size: 1.75em;
  padding: 1em;
  margin-left: -1em;
  width: 100%;
  text-align: center;
  color: ${bkgColor};
  background-color: ${mainColor};
`;
const TabBar = styled.div`
  width: 100%;
  display: flex;
`;
const TabBody = styled.div`
  margin: 0.5em;
`;
const Tab = styled.div`
  flex: 1;
  font-size: 1.1em;
  text-align: center;
  padding: 0.25em;
  font-weight: ${props => (props.selected ? 900 : 500)};
  color: ${props => (props.selected ? bkgColor : mainColor)};
  background-color: ${props => (props.selected ? mainColor : bkgColor)};
  border: 1px solid ${mainColor};
`;
const Button = styled.button`
  outline-style: none;
  background-color: ${props => (props.primary ? mainColor : bkgColor)};
  color: ${props => (props.primary ? bkgColor : mainColor)};
  font-size: 1.25em;
  margin: 0.25em;
  padding: 0.25em 1em;
  border: 2px solid ${mainColor};
  &:active {
    background-color: ${props => (props.primary ? lightColor : inputColor)};
  }
`;
const Field = styled.div`
  margin: 0.25em;
`;
const Label = styled.label`
  font-size: 1.1em;
  color: ${mainColor};
`;
const Input = styled.input`
  outline-style: none;
  color: ${mainColor};
  font-size: 1.1em;
  padding: 0.25em;
  border: unset;
  border-bottom: 1px solid ${mainColor};
  &:focus {
    border-top: 1px solid ${inputFocusColor};
    border-left: 1px solid ${inputFocusColor};
    border-right: 1px solid ${inputFocusColor};
    background-color: ${inputColor};
  }
`;
const A = styled.a`
  margin: 0.25em;
  font-size: 1.25em;
  color: ${mainColor};
`;

class Code extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }
  inputs = {};
  send = async () => {
    const label = this.inputs.label.value;
    const points = +this.inputs.points.value;
    const nbDays = +this.inputs.nbDays.value;
    const nbPlayers = +this.inputs.nbPlayers.value;
    if (label && points > 0 && nbDays > 0 && nbPlayers > 0) {
      console.log(`send ${label} ${points} ${nbDays} ${nbPlayers}`);
      this.inputs.button.disabled = true;

      try {
        const result = await axios.post(
          "https://ipw21gnfgd.execute-api.eu-west-1.amazonaws.com/dev/code",
          { label, points, nbPlayers, nbDays }
        );
        console.log(JSON.stringify(result));

        this.setState({ code: result.data.code });
      } catch (e) {
        console.log(JSON.stringify(e));
        this.setState({ message: e.response.data.message });
      }
      this.inputs.button.disabled = false;
    } else {
      this.setState({ message: "Remplissez tous les champs" });
    }
    setTimeout(() => this.setState({ message: "" }), 5000);
  };
  render({ match } = this.props) {
    return (
      <div>
        <Field>
          <Label>Activité</Label>
          <Input
            name="label"
            placeholder="nom de l'activité"
            required
            ref={input => (this.inputs.label = input)}
            type="text"
          />
        </Field>
        <Field>
          <Label>Points</Label>
          <Input
            name="points"
            placeholder="nombre de points attribués"
            required
            ref={input => (this.inputs.points = input)}
            type="number"
            min={1}
          />
        </Field>
        <Field>
          <Label>Participants</Label>
          <Input
            name="nbPlayers"
            placeholder="nombre de participants"
            required
            ref={input => (this.inputs.nbPlayers = input)}
            type="number"
            min={1}
          />
        </Field>
        <Field>
          <Label>Jours actif</Label>
          <Input
            name="nbDays"
            placeholder="nombre de jours d'activation"
            required
            ref={input => (this.inputs.nbDays = input)}
            type="number"
            min={1}
          />
        </Field>
        <Button ref={input => (this.inputs.button = input)} onClick={this.send}>
          Enregistrer
        </Button>
        <div>{this.state.message}</div>
        {this.state.code && (
          <div>
            Le nouveau code est <strong>{this.state.code}</strong> (mémorisez
            le)
          </div>
        )}
      </div>
    );
  }
}

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }
  inputs = {};
  send = async () => {
    let pseudo = this.inputs.pseudo.value;
    if (pseudo) {
      pseudo = pseudo.toLocaleLowerCase();
      console.log(`send ${pseudo}`);
      this.inputs.button.disabled = true;

      try {
        const result = await axios.post(
          "https://ipw21gnfgd.execute-api.eu-west-1.amazonaws.com/dev/user",
          { pseudo }
        );
        console.log(JSON.stringify(result));

        this.setState({
          message: `le pseudo ${result.data.pseudo} a bien été enregistré`
        });
      } catch (e) {
        console.log(JSON.stringify(e));
        this.setState({ message: e.response.data.message });
      }
      this.inputs.button.disabled = false;
    } else {
      this.setState({ message: "Donnez un pseudo" });
    }
    setTimeout(() => this.setState({ message: "" }), 5000);
  };
  render({ match } = this.props) {
    return (
      <div>
        <Field>
          <Label>Pseudo</Label>
          <Input
            name="pseudo"
            placeholder="nouveau pseudo à ajouter"
            required
            ref={input => (this.inputs.pseudo = input)}
            type="text"
          />
        </Field>
        <Button ref={input => (this.inputs.button = input)} onClick={this.send}>
          Enregistrer
        </Button>
        <div>{this.state.message}</div>
      </div>
    );
  }
}

class CsvLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      url: null
    };
  }
  inputs = {};
  onChange = () => {
    let minDate = this.inputs.minDate.value;
    let maxDate = this.inputs.maxDate.value;
    if (minDate && maxDate && minDate <= maxDate) {
      console.log(`send ${minDate}, ${maxDate}`);
      this.setState({
        message: `Cliquez sur le lien ci-dessus`,
        url: `https://ipw21gnfgd.execute-api.eu-west-1.amazonaws.com/dev/csv/${minDate}/${maxDate}/scores.csv`
      });
    } else {
      this.setState({ message: "Précisez des dates valides", url: null });
    }
    setTimeout(() => this.setState({ message: "" }), 5000);
  };
  onClickLink = async () => {
    try {
      const result = await axios.get(this.state.url);
      console.log(JSON.stringify(result));

      this.setState({ message: "" });
    } catch (e) {
      console.log(JSON.stringify(e));
      this.setState({ message: "erreur de chargement" });
    }
    setTimeout(() => this.setState({ message: "" }), 5000);
  };

  render({ match } = this.props) {
    return (
      <div>
        <Field>
          <Label>Scores à charger du</Label>
          <Input
            name="minDate"
            placeholder="date min"
            required
            ref={input => (this.inputs.minDate = input)}
            type="date"
            onChange={this.onChange}
          />
          <Label>au</Label>
          <Input
            name="maxDate"
            placeholder="date max"
            required
            ref={input => (this.inputs.maxDate = input)}
            type="date"
            onChange={this.onChange}
          />
        </Field>
        {this.state.url && <A href={this.state.url}>lien de téléchargement</A>}
        <div>{this.state.message}</div>
      </div>
    );
  }
}

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
          <div>Ordre Siphonique</div>
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
