import React, { Component } from "react";
import { Link } from "react-router";
import { graphql } from "@apollo/client/react/hoc";
import query from "../queries/fetchSongs";
import { gql } from "@apollo/client";

class SongList extends Component {
  onSongDelete(id) {
    this.props
      .mutate({
        variables: { id },
      })
      .then(() => this.props.data.refetch());
  }
  renderSongs() {
    console.log(this.props.data.songs);
    return this.props.data.songs.map((song) => {
      return (
        <li key={song.id} className="collection-item">
          <Link to={"/songs/" + song.id}>{song.title}</Link>
          <i
            className="material-icons"
            onClick={() => this.onSongDelete(song.id)}
          >
            delete
          </i>
        </li>
      );
    });
  }
  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));
