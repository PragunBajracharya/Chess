/**
 *
 * Check the current selected piece and displays all the possible moves
 * @param pieceClass
 * @param div
 */
function checkAndDisplayAvailableMoves(pieceClass, div) {
    const hint = '<div class="hint"></div>';
    let destinationBlock;
    let currentRow = $(div).data('row');
    let currentColumn = $(div).data('column');
    if (pieceClass[0] === 'w') {
        let piece = pieceClass[1];
        switch (piece) {
            case 'p':
                if (currentRow === 7) {
                    for (let i = 1; i <= 2; i++) {
                        destinationBlock = getBlockByRowAndColumn(currentRow - i, currentColumn);
                        if (isValidWhitePawnMove(div, destinationBlock)) {
                            destinationBlock.html(hint);
                        }
                    }
                } else {
                    destinationBlock = getBlockByRowAndColumn(currentRow - 1, currentColumn);
                    if (isValidWhitePawnMove(div, destinationBlock)) {
                        destinationBlock.html(hint);
                    }
                }
                destinationBlock = getBlockByRowAndColumn(currentRow - 1, currentColumn - 1);
                if (isValidWhitePawnMove(div, destinationBlock)) {
                    destinationBlock.html(hint);
                }

                destinationBlock = getBlockByRowAndColumn(currentRow - 1, currentColumn + 1);
                if (isValidWhitePawnMove(div, destinationBlock)) {
                    destinationBlock.html(hint);
                }
                break;
            case 'r':
                showStraightMoves('w', currentRow, currentColumn, div, hint);
                break;
            case 'n':
                showKnightMoves('w', div, hint);
                break;
            case 'b':
                showDiagonalMoves('w', currentRow, currentColumn, div, hint);
                break;
            case 'k':
                console.log('white king');
                break;
            case 'q':
                showDiagonalMoves('w', currentRow, currentColumn, div, hint);
                showStraightMoves('w', currentRow, currentColumn, div, hint);
                break;
        }
    } else {
        let piece = pieceClass[1];
        switch (piece) {
            case 'p':
                if (currentRow === 2) {
                    for (let i = 1; i <= 2; i++) {
                        destinationBlock = getBlockByRowAndColumn(currentRow + i, currentColumn);
                        if (isValidBlackPawnMove(div, destinationBlock)) {
                            destinationBlock.html(hint);
                        }
                    }
                } else {
                    destinationBlock = getBlockByRowAndColumn(currentRow + 1, currentColumn);
                    if (isValidBlackPawnMove(div, destinationBlock)) {
                        destinationBlock.html(hint);
                    }
                }
                destinationBlock = getBlockByRowAndColumn(currentRow + 1, currentColumn - 1);
                if (isValidBlackPawnMove(div, destinationBlock)) {
                    destinationBlock.html(hint);
                }

                destinationBlock = getBlockByRowAndColumn(currentRow + 1, currentColumn + 1);
                if (isValidBlackPawnMove(div, destinationBlock)) {
                    destinationBlock.html(hint);
                }
                break;
            case 'r':
                showStraightMoves('b', currentRow, currentColumn, div, hint);
                break;
            case 'n':
                showKnightMoves('b', div, hint);
                break;
            case 'b':
                showDiagonalMoves('b', currentRow, currentColumn, div, hint);
                break;
            case 'k':
                console.log('black king');
                break;
            case 'q':
                showStraightMoves('b', currentRow, currentColumn, div, hint);
                showDiagonalMoves('b', currentRow, currentColumn, div, hint);
                break;
        }
    }
}

function showDiagonalMoves(whiteOrBlack, currentRow, currentColumn, div, hint) {
    let leftTop = true, rightTop = true, leftBottom = true, rightBottom = true;
    let destinationBlockLeftTop, destinationBlockRightTop, destinationBlockLeftBottom,
        destinationBlockRightBottom;
    for (let i = 1; i <= 8; i++) {
        destinationBlockLeftTop = getBlockByRowAndColumn(currentRow - i, currentColumn - i);
        if (isValidBishopMove(div, destinationBlockLeftTop) && leftTop) {
            if (checkWhiteOrBlack($(destinationBlockLeftTop)) === whiteOrBlack) {
                leftTop = false;
            } else {
                destinationBlockLeftTop.html(hint);
            }
        }
        destinationBlockRightBottom = getBlockByRowAndColumn(currentRow + i, currentColumn + i);
        if (isValidBishopMove(div, destinationBlockRightBottom) && rightBottom) {
            if (checkWhiteOrBlack($(destinationBlockRightBottom)) === whiteOrBlack) {
                rightBottom = false;
            } else {
                destinationBlockRightBottom.html(hint);
            }
        }
        destinationBlockRightTop = getBlockByRowAndColumn(currentRow - i, currentColumn + i);
        if (isValidBishopMove(div, destinationBlockRightTop) && rightTop) {
            if (checkWhiteOrBlack($(destinationBlockRightTop)) === whiteOrBlack) {
                rightTop = false;
            } else {
                destinationBlockRightTop.html(hint);
            }
        }
        destinationBlockLeftBottom = getBlockByRowAndColumn(currentRow + i, currentColumn - i);
        if (isValidBishopMove(div, destinationBlockLeftBottom) && leftBottom) {
            if (checkWhiteOrBlack($(destinationBlockLeftBottom)) === whiteOrBlack) {
                leftBottom = false;
            } else {
                destinationBlockLeftBottom.html(hint);
            }
        }
    }
}

function showStraightMoves(whiteOrBlack, currentRow, currentColumn, div, hint) {
    let left = true, right = true, top = true, bottom = true;
    let destinationBlockLeft, destinationBlockRight, destinationBlockTop, destinationBlockBottom;
    for (let i = 1; i <= 8; i++) {
        destinationBlockLeft = getBlockByRowAndColumn(currentRow, currentColumn - i);
        if (isValidRookMove(div, destinationBlockLeft) && left) {
            if (checkWhiteOrBlack($(destinationBlockLeft)) === whiteOrBlack) {
                left = false;
            } else {
                destinationBlockLeft.html(hint);
            }
        }
        destinationBlockRight = getBlockByRowAndColumn(currentRow, currentColumn + i);
        if (isValidRookMove(div, destinationBlockRight) && right) {
            if (checkWhiteOrBlack($(destinationBlockRight)) === whiteOrBlack) {
                right = false;
            } else {
                destinationBlockRight.html(hint);
            }
        }
        destinationBlockTop = getBlockByRowAndColumn(currentRow - i, currentColumn);
        if (isValidRookMove(div, destinationBlockTop) && top) {
            if (checkWhiteOrBlack($(destinationBlockTop)) === whiteOrBlack) {
                top = false;
            } else {
                destinationBlockTop.html(hint);
            }
        }
        destinationBlockBottom = getBlockByRowAndColumn(currentRow + i, currentColumn);
        if (isValidRookMove(div, destinationBlockBottom) && bottom) {
            if (checkWhiteOrBlack($(destinationBlockBottom)) === whiteOrBlack) {
                bottom = false;
            } else {
                destinationBlockBottom.html(hint);
            }
        }
    }
}

function showKnightMoves(whiteOrBlack, div, hint) {
    let destinationBlock;
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            destinationBlock = getBlockByRowAndColumn(i, j);
            if (isValidKnightMove(div, destinationBlock)) {
                if (checkWhiteOrBlack($(destinationBlock)) !== whiteOrBlack) {
                    destinationBlock.html(hint);
                }
            }
        }
    }
}
