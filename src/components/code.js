import axios from "axios";
import React, { Component } from "react";
import { Field, Input, Label, Button } from "../style/styles";

axios.defaults.headers.common["x-api-key"] =
  "5E8mftCnJ92ttL71HKepv5XjgumUufxc5Y9We6n1";

export class Code extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      users: null
    };
  }
  async componentDidMount() {
    if (this.state.users !== null) return;
    const result = await axios.get(
      "https://ipw21gnfgd.execute-api.eu-west-1.amazonaws.com/dev/users"
    );
    this.inputs.users = [];
    const users = result.data.map(user => user.pseudo).sort();
    console.log(users);
    this.setState({ users });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  inputs = { users: [] };

  send = async () => {
    console.log(this.inputs.users.map(input => input && input.name));
    const label = this.inputs.label.value;
    const points = +this.inputs.points.value;
    const players = this.inputs.users.reduce((result, input) => {
      if (input) {
        if (input.checked) {
          result.push(input.name);
        }
      } else {
        console.log("input null !!!");
      }
      return result;
    }, []);
    if (label && points > 0) {
      console.log(`send ${label} ${points} ${players}`);
      this.inputs.button.disabled = true;

      try {
        const result = await axios.post(
          "https://ipw21gnfgd.execute-api.eu-west-1.amazonaws.com/dev/add",
          { label, points, players }
        );
        console.log(JSON.stringify(result));

        this.setState({ code: result.data.code });
        this.inputs.label.value = "";
        this.inputs.points.value = "";
        this.inputs.users.forEach(input => {
          if (input && input.checked) {
            input.checked = false;
          }
        });
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

  renderUsers() {
    this.inputs.users = [];
    return this.state.users !== null && this.state.users.length ? (
      this.state.users.map(
        pseudo =>
          (
            <div key={pseudo}>
              <Input
                id={pseudo}
                name={pseudo}
                ref={input =>
                  this.inputs.users.push(input)
                }
                type="checkbox"
              />
              <label htmlFor={pseudo}>{pseudo}</label>
            </div>
          )
    ) : (
      <div>Aucun pseudo</div>
    );
  }
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
          <Label>
            {this.state.users !== null && this.state.users.length
              ? `${this.state.users.length} Participants`
              : `Aucun participant disponible`}
          </Label>
        </Field>
        {this.renderUsers()}
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
