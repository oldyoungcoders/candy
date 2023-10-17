var candies = ['Blue','Orange','Green','Yellow','Red','Purple'];
var board = [];
var rows = 9;    
var columns = 9;
var score = 0;




var currTile;
var otherTile;




window.onload = function() {
    startGame();

    //second call this function every 100ms
    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    },200);
}




function randomCandy(){
    return candies[Math.floor(Math.random() * candies.length)];
}





function startGame() {
    for(let r=0; r<rows; r++) {

        let row = [];

        for(let c =0; c < columns; c++) {



            // <img id='0-0' src='./img/Red.png'>
            let title = document.createElement('img');
            title.id = r.toString() + '-' + c.toString();
            title.src = './images/' + randomCandy() + '.jpg';



            //DRAG FUNCTIONALITY

            title.addEventListener('dragstart', dragStart);//clickon a candy
            title.addEventListener('dragover', dragOver);//click on a candy and move it
            title.addEventListener('dragenter', dragEnter);//draggin candy onto another candy
            title.addEventListener('dragleave', dragLeave);//bla bla
            title.addEventListener('drop', dragDrop);//bla bla bla
            title.addEventListener('dragend', dragEnd);//bla bla bla bla
 


            document.getElementById('board').append(title);
            row.push(title);

        }


        board.push(row);


    }


    console.log(board);


}








function dragStart(){
    currTile = this;
}





function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){
    console.log('drag leave');
}





function dragDrop(){
    otherTile = this;
}



function dragEnd(){

    if(currTile.src.includes('blank')|| otherTile.src.includes('blank')){
        return;
    }

    let currCoords = currTile.id.split('-');
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split('-');
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r2 == r;
    let moveRight = c2 == c+1 && r2 == r;

    let moveUp = c2 == c && r2 == r-1;
    let moveDown = c2 == c && r2 == r+1;


    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;


    if(isAdjacent){
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
        
        let validMove = checkValid();
        if(!validMove){
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;
        }
    }

}





function crushCandy(){
    crushThree();
    document.getElementById('score').innerText = score;
}





function crushThree(){

    for(let r = 0; r<rows; r++){
        for(let c = 0; c < columns-2; c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];

            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes('blank')){
                candy1.src = './images/blank.jpg';
                candy2.src = './images/blank.jpg';
                candy3.src = './images/blank.jpg';
                score += 30;
            }
        }
    }


    //check columns

    for(let c= 0 ; c<columns;c++){
        for(let r = 0; r<rows-2;r++){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];

            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes('blank')){
                candy1.src = './images/blank.jpg';
                candy2.src = './images/blank.jpg';
                candy3.src = './images/blank.jpg';
                score += 30;
            }
        }
    }
}




function checkValid(){

    for(let r = 0; r<rows; r++){
        for(let c = 0; c < columns-2; c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];

            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes('blank')){
                return true;
            }
        }
    }


    //check columns

    for(let c= 0 ; c<columns;c++){
        for(let r = 0; r<rows-2;r++){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];

            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes('blank')){
                return true;
            }
        }
    }

    return false;
}


function slideCandy() {
    for(let c= 0; c<columns;c++){
        let ind = rows-1;
        for(let r =columns-1; r>=0;r--){
            if(!board[r][c].src.includes('blank')){
                board[ind][c].src = board[r][c].src;
                ind-=1;
            }
        }

        for(let r = ind; r>=0;r--){
            board[r][c].src = './images/blank.jpg';
        }
    }
}




function generateCandy(){
    for(let c = 0; c<columns;c++){
        if(board[0][c].src.includes('blank')){
            board[0][c].src = './images/' + randomCandy() + '.jpg';
        }
    }
}