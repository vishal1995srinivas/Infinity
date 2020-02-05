import React, { Component } from "react";
import { Input } from "semantic-ui-react";

class TitleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleTitle = event => {
    this.props.handleTitle(event);
  };
  render() {
    const { title } = this.props;
    return (
      <div className="title">
        <Input
          transparent
          fluid
          inverted
          icon="tag"
          iconPosition="left"
          placeholder="Request Title Here"
          className="inputUrl"
          value={title}
          onChange={this.handleTitle}
        />
      </div>
    );
  }
}

export default TitleComponent;
