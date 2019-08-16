import axios from "axios";
import React, { Component } from "react";
import { Field, Input, Button, Label } from "../style/styles";

axios.defaults.headers.common["x-api-key"] =
  "5E8mftCnJ92ttL71HKepv5XjgumUufxc5Y9We6n1";

export class User extends Component {
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
