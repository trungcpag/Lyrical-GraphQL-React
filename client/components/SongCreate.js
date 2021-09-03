import React, { Component } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
// import { compose, graphql } from "react-apollo";

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.mutate({
      variables: {
        title: this.state.title,
      },
    });
  }

  render() {
    return (
      <div>
        <h3>Create Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song title:</label>
          <input
            onChange={(event) => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSonge($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
// export default SongCreate;
