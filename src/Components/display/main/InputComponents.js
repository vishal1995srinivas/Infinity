import React, { Component } from "react";
import Input from "muicss/lib/react/input";

class InputComponents extends Component {
  render() {
    return (
      <div>
        <div>
          <Input label="Input 2" defaultValue="Value on load" />
        </div>
      </div>
    );
  }
}

export default InputComponents;
