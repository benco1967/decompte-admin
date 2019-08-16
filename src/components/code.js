import axios from "axios";
import React, { Component } from "react";
import { Field, Input, Label, Button } from "../style/styles";

export class Code extends Component {
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
          <Label>Jours actifs</Label>
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
