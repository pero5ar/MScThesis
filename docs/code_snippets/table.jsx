import * as React from 'react';

class Tablica extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: props.rows,
    };
  }

  delete = (rowId) => {
    this.setState((state) => ({
      rows: state.rows.filter((row) => row.id !== rowId)
    }));
  }

  render() {
    return (
      <table>
        {this.state.rows.map((row) => (
          <Redak
            key={row.id}
            data={row.data}
            delete={this.delete.bind(row.id)}
          />
        ))}
      </table>
    );
  }
}

function Readak(props) {
  return (
    <tr key={props.key}>
      <div>{props.data}</div>
      <Button onClick={props.delete} text="Obriši" />
    </tr>
  );
}

function Button(props) {
  return <button onClick={props.onClick}>{props.text}</button>;
}
