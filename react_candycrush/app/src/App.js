/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import blueCandy from './images/blue-candy.png';
import greenCandy from './images/green-candy.png';
import redCandy from './images/red-candy.png';
import yellowCandy from './images/yellow-candy.png';
import orangeCandy from './images/orange-candy.png';
import purpleCandy from './images/purple-candy.png';
import blank from './images/blank.png';

const width = 8;
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
]


const App = () => {
  const [ currentColorArrange, setCurrentColorArrange ] = useState([])
  const [ sqrBeingDragged, setSqrBeingDragged ] = useState(null)
  const [ sqrBeingReplaced, setSqrBeingReplaced ] = useState(null)

  const check3Column = () => {
    for(let i = 0; i <= 47; i++) { 
      const ThreeColumn = [i, i + width, i + ( 2 * width )];
      const colorToCheck = currentColorArrange[i];
      if ( ThreeColumn.every( square => currentColorArrange[square] === colorToCheck ) ) {
        ThreeColumn.forEach( square => currentColorArrange[square] = blank );
        return true;
      }
    }
  }

  const check4Column = () => {
    for (let i = 0; i <= 39; i++) {
      const FourColumn = [ i, i + width,  i + ( 2 * width ), i + ( 3 * width ) ];
      const colorToCheck = currentColorArrange[i];
      if ( FourColumn.every( square => currentColorArrange[square] === colorToCheck ) ) {
        FourColumn.forEach( square => currentColorArrange[square] = blank );
        return true;
      }
      
    }
  }

  const check3Row = () => {
    for (let i = 0; i <= 61; i++) {
     
      const ThreeRow = [i, i + 1, i+2];
      const  colorToCheck = currentColorArrange[i];
      const notValid = [ 6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64 ];

      if(notValid.includes(i)) continue 

      if (ThreeRow.every( square => currentColorArrange[square] === colorToCheck )) {
        ThreeRow.forEach( square => currentColorArrange[square] = blank );
        return true;
      }
    }
  }

  const check4Row = () => {
    for (let i = 0; i <= 61; i++) {
     
      const FourRow = [i, i + 1, i+2, i + 3];
      const  colorToCheck = currentColorArrange[i];
      const notValid = [ 5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64 ];

      if(notValid.includes(i)) continue 

      if (FourRow.every( square => currentColorArrange[square] === colorToCheck )) {
        FourRow.forEach( square => currentColorArrange[square] = blank );
        return true;
      }
    }
  }

  const moveSqrDown = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrange[i] === '') {
        let randomColor = Math.floor(Math.random() * candyColors.length);
        currentColorArrange[i] = candyColors[randomColor]; 
      }

      if ((currentColorArrange[i + width]) === '') {
        currentColorArrange[i + width] = currentColorArrange[i];
        currentColorArrange[i] = blank;
      }

    }
  }

  const dragStart = (e) => {
    console.log(e.target);
    console.log('drag start');
    setSqrBeingDragged(e.target);
  }

  const dragDrop = (e) => {
    console.log(e.target);
    console.log('drag drop');
    setSqrBeingReplaced(e.target);
  }

  const dragEnd = (e) => {
    console.log('drag stop');

    const squareBeingDraggedId =  parseInt( sqrBeingDragged.getAttribute('data-id') );
    const squareBeingReplacedId =  parseInt( sqrBeingReplaced.getAttribute('data-id') );

    console.log('Squared being dragged ID: ' + sqrBeingDragged);
    console.log('Squared being replaced ID: ' + sqrBeingReplaced);

    currentColorArrange[squareBeingReplacedId] = sqrBeingDragged.getAttribute('src');
    currentColorArrange[squareBeingDraggedId] = sqrBeingReplaced.getAttribute('src');

    // MOVE VALIDATION

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ]

    const IsValidMove = validMoves.includes(squareBeingReplacedId)

    const is4Column = check4Column();
    const is4Row = check4Row();
    const is3Column = check3Column();
    const is3Row = check3Row();

    if (squareBeingReplacedId && 
        IsValidMove && 
        (is4Column || is3Column || is4Row || is3Row)
       ) {
      setSqrBeingDragged(null);
      setSqrBeingReplaced(null); 
    } else {
      currentColorArrange[squareBeingReplacedId] = sqrBeingReplaced.getAttribute('src');
      currentColorArrange[squareBeingDraggedId] = sqrBeingDragged.getAttribute('src');
      setCurrentColorArrange([...currentColorArrange])
    }
  }

  const createBoard = () => {

    const randomColorArrange = [];

    for (let i = 0; i < width * width; i++) {
      const num = Math.floor(Math.random() * candyColors.length)
      const randomColor = candyColors[num]
      randomColorArrange.push(randomColor)
    }
    setCurrentColorArrange(randomColorArrange)
    // console.log( randomColorArrange )
  };

  useEffect( () => {
   createBoard()
  }, [] );

  useEffect( () => {
    const timer = setInterval( () => {
      check4Column();
      check3Column();
      check4Row();
      check3Row();
      moveSqrDown();
      setCurrentColorArrange( [...currentColorArrange] )
    }, 100 );
    return () => clearInterval(timer);
  }, [check4Column ,check3Column, check4Row, check3Row, moveSqrDown, currentColorArrange] ) 





  return (
    <div className="app">
      <div className="game">
        {currentColorArrange.map( (candyColor, index) => (
          <img
            key={index}
            src={candyColors}
            data-id= {index}
            draggable= {true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          ></img>
        ) )}
      </div>
    </div>
  );
}

export default App;
