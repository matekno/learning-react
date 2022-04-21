import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

    constructor(props){
        // un componente puede tener constructores parametrizados
        super(props) // porque extiende de React.Component
        // Un estado en React es, un almacén de datos mutable
        // de componentes y que además son autónomos. 
        // O sea, el estado pertenece una clase autónoma que cualquiera pueda
        // importar y usar en su aplicación.  
        this.state = {
            value: null, // al crearse, el estado no tiene ningun valor.
        };
    }
    render() {
        return (
            // cada vez que cualquier boton es tocado, consolelogea click.
            <button className="square" onClick={()=> console.log('click')}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        // recibimos un param con un num
        // todos los componentes Square tienen una prop llamada value, seteada por el param.

        return <Square value={i} />;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
