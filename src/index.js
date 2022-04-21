import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) { // en lugar de declarar una clase con metodo render, hacemos una funcion que devuelve el componenete.
    // ahora queremos pasar el estado al board para que las operaciones sean mas faciles.
    return (
        <button
            className="square"
            onClick={props.onClick} // como estamos pasando props por parametro, podemos llamar directo a onClick
        >
            {/* lo mismo con esto; podemos sacar el this.*/}
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: null,
            squares: Array(9).fill(null), // squares es una prop del estado que tiene un array con 9 pos. vacias. 
            xIsNext: true,
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares)) { // si hay ganador..
            Winner(squares[i]);
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'; // si xIsNext es true, cambia a O.
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext, // guarda el siguiente en el estado. El siguiente es del board, no del cuadradito.
        });
    }

    renderSquare(i) {
        // recibimos un param con un num
        // todos los componentes Square tienen una prop llamada value, seteada por el param.

        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    render() {
        let status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); // muestra variable del siguiente jugador
        if (this.winner != null) {
            status = 'Winner is: ' + (this.winner);
        }
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

function Winner(props) {
    return(
        <h2>The Winner is: {props.winner}</h2>
    )
}

function Game(props) {
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

// ========================================

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
