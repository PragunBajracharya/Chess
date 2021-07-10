jQuery(document).ready(function ($) {
    window.moveCount = 0
    window.castleAble = {black: {left: true, right: true}, white: {left: true, right: true}};
    /**
     * Add dynamic height to chess board
     */
    let chessBoard = $('#chess-board');
    let chessBoardWidth = chessBoard.innerWidth();
    chessBoard.innerHeight(chessBoardWidth);
    $(window).on('resize', function () {
        chessBoardWidth = chessBoard.innerWidth();
        chessBoard.innerHeight(chessBoardWidth);
    });

    /**
     *
     * Set dynamic background color to chess board
     */
    let count = 1;
    let paint = '#769656', changePaint = 1;
    let block = $('.block');
    block.each(function () {
        if (count % 2 === 0) {
            this.style.backgroundColor = paint;
        } else {
            if (changePaint % 2 === 0) {
                this.style.backgroundColor = '#769656';
            }
        }
        if (count % 8 === 0) {
            if (changePaint % 2 === 0) {
                paint = '#769656';
            } else {
                paint = '#eeeed2';
            }
            changePaint++;
        }
        count++;
    });

    /**
     *
     * Select and move Pieces
     */
    let pieceClass = ['wr', 'br', 'wb', 'bb', 'wn', 'bn', 'wp', 'bp', 'wk', 'bk', 'wq', 'bq'];
    block.on('click', function () {
        block.removeClass('danger');
        let selectedBlock = $('.block.selected');
        if (window.moveCount % 2 === 0 && ((checkWhiteOrBlack('.block.selected') === 'b' && getPieceClass(this) === undefined) || (checkWhiteOrBlack('.block.selected') === 'b' && checkWhiteOrBlack(this) === 'w'))) {
            //Add class danger to show wrong move if black moves in turn of white
            selectedBlock.addClass('danger');
            $('.block').removeClass('selected');
        } else if (window.moveCount % 2 !== 0 && ((checkWhiteOrBlack('.block.selected') === 'w' && getPieceClass(this) === undefined) || (checkWhiteOrBlack('.block.selected') === 'w' && checkWhiteOrBlack(this) === 'b'))) {
            //Add class danger to show wrong move if white moves in turn of black
            selectedBlock.addClass('danger');
            $('.block').removeClass('selected');
        } else {
            //Move pieces
            if ($(this).hasClass('selected')) {
                // remove selected class if piece is already selected
                $(this).removeClass('selected');
            } else if (this.className.split(' ')[1] !== undefined && ((checkWhiteOrBlack(this) === 'w' && checkWhiteOrBlack('.block.selected') === 'b') || (checkWhiteOrBlack(this) === 'b' && checkWhiteOrBlack('.block.selected') === 'w'))) {
                // logic to take piece
                if (isValidMove('.block.selected', this)) {
                    $(this).addClass(getPieceClass('.block.selected'));
                    selectedBlock.removeClass(getPieceClass('.block.selected'));
                    $(this).removeClass(getPieceClass(this));
                    window.moveCount++;
                } else {
                    selectedBlock.addClass('danger');
                    $('.block').removeClass('selected');
                }
            } else if (this.className.split(' ')[1] !== undefined) {
                // switch selected if same colored piece
                $('.block').removeClass('selected');
                $(this).addClass('selected');
            } else {
                // moved piece to blank space
                if (selectedBlock.attr('class') !== undefined && isValidMove('.block.selected', this)) {
                    let movingPiece = selectedBlock.attr('class').split(' ')[1];
                    selectedBlock.removeClass(movingPiece);
                    selectedBlock.removeClass('selected');
                    $(this).addClass(movingPiece);
                    window.moveCount++;
                } else {
                    selectedBlock.addClass('danger');
                    $('.block').removeClass('selected');
                }
            }
        }

        if (isSelected(this)) {
            $('.block').html('');
            checkAndDisplayAvailableMoves(getPieceClass(this), this);
        } else {
            $('.block').html('');
        }
    });
    
    $('body').on('contextmenu', function(e){
        e.preventDefault();
        $('.block').removeClass('selected');
        $('.hint').remove();
    });
});
