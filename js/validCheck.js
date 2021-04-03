/**
 *
 * Return is a piece is moved in valid block or not
 * @param sourceBlock
 * @param destinationBlock
 */
function isValidMove(sourceBlock, destinationBlock) {
    let currentPieceClass = getPieceClass(sourceBlock);
    switch (currentPieceClass) {
        case 'wp':
            return isValidWhitePawnMove(sourceBlock, destinationBlock);
        case 'bp':
            return isValidBlackPawnMove(sourceBlock, destinationBlock);
        case 'wr':
        case 'br':
            return isValidRookMove(sourceBlock, destinationBlock);
        case 'wb':
        case 'bb':
            return isValidBishopMove(sourceBlock, destinationBlock);
        case 'wn':
        case 'bn':
            return isValidKnightMove(sourceBlock, destinationBlock);
        case 'wk':
        case 'bk':
            return isValidKingMove(sourceBlock, destinationBlock);
        case 'wq':
        case 'bq':
            return isValidQueenMove(sourceBlock, destinationBlock);
    }
}

/**
 *
 * @param sourceBlock
 * @param destinationBlock
 * @returns {boolean}
 *
 * Check valid Rook move
 */
function isValidRookMove(sourceBlock, destinationBlock) {
    let sourceRow = $(sourceBlock).data('row');
    let sourceColumn = $(sourceBlock).data('column');
    let destinationRow = $(destinationBlock).data('row');
    let destinationColumn = $(destinationBlock).data('column');
    if (isValidStraightMove(sourceRow, sourceColumn, destinationRow, destinationColumn)) {
        if (sourceRow === 8 && sourceColumn === 8) {
            window.castleAble.white.right = false;
        }
        if (sourceRow === 8 && sourceColumn === 1) {
            window.castleAble.white.left = false;
        }
        if (sourceRow === 1 && sourceColumn === 8) {
            window.castleAble.black.right = false;
        }
        if (sourceRow === 1 && sourceColumn === 1) {
            window.castleAble.black.left = false;
        }
        return true;
    }
    return false;
}

/**
 *
 * @param sourceBlock
 * @param destinationBlock
 * @returns {boolean}
 *
 * Check valid Bishop move
 */
function isValidBishopMove(sourceBlock, destinationBlock) {
    let sourceRow = $(sourceBlock).data('row');
    let sourceColumn = $(sourceBlock).data('column');
    let destinationRow = $(destinationBlock).data('row');
    let destinationColumn = $(destinationBlock).data('column');
    return isValidDiagonalMove(sourceRow, sourceColumn, destinationRow, destinationColumn);

}

/**
 *
 * @param sourceBlock
 * @param destinationBlock
 * @returns {boolean}
 *
 * Check valid Knight move
 */
function isValidKnightMove(sourceBlock, destinationBlock) {
    let sourceRow = $(sourceBlock).data('row');
    let sourceColumn = $(sourceBlock).data('column');
    let destinationRow = $(destinationBlock).data('row');
    let destinationColumn = $(destinationBlock).data('column');
    if (destinationColumn === sourceColumn + 2 && destinationRow === sourceRow + 1) {
        return true;
    } else if (destinationColumn === sourceColumn + 1 && destinationRow === sourceRow + 2) {
        return true;
    } else if (destinationColumn === sourceColumn - 1 && destinationRow === sourceRow + 2) {
        return true;
    } else if (destinationColumn === sourceColumn - 2 && destinationRow === sourceRow + 1) {
        return true;
    } else if (destinationColumn === sourceColumn + 1 && destinationRow === sourceRow - 2) {
        return true;
    } else if (destinationColumn === sourceColumn + 2 && destinationRow === sourceRow - 1) {
        return true;
    } else if (destinationColumn === sourceColumn - 1 && destinationRow === sourceRow - 2) {
        return true;
    } else if (destinationColumn === sourceColumn - 2 && destinationRow === sourceRow - 1) {
        return true;
    }
    return false;
}

/**
 *
 * @param sourceBlock
 * @param destinationBlock
 * @returns {boolean}
 *
 * Check valid King move
 */
function isValidKingMove(sourceBlock, destinationBlock) {
    let sourceRow = $(sourceBlock).data('row');
    let sourceColumn = $(sourceBlock).data('column');
    let destinationRow = $(destinationBlock).data('row');
    let destinationColumn = $(destinationBlock).data('column');
    if (checkWhiteOrBlack(sourceBlock) === 'w' && destinationColumn === 7 && destinationRow === 8 && window.castleAble.white.right) {
        if (!checkHasPiece(8, 7) && !checkHasPiece(8, 6) && getPieceClass(getBlockByRowAndColumn(8, 8)) === 'wr') {
            $('.block[data-column=8][data-row=8]').removeClass('wr');
            $('.block[data-column=6][data-row=8]').addClass('wr');
            window.castleAble.white.right = false;
            window.castleAble.white.left = false;
            return true;
        }
    } else if (checkWhiteOrBlack(sourceBlock) === 'w' && destinationColumn === 3 && destinationRow === 8 && window.castleAble.white.left) {
        if (!checkHasPiece(8, 2) && !checkHasPiece(8, 3) && !checkHasPiece(8, 4) && getPieceClass(getBlockByRowAndColumn(8, 1)) === 'wr') {
            $('.block[data-column=1][data-row=8]').removeClass('wr');
            $('.block[data-column=4][data-row=8]').addClass('wr');
            window.castleAble.white.right = false;
            window.castleAble.white.left = false;
            return true;
        }
    } else if (checkWhiteOrBlack(sourceBlock) === 'b' && destinationColumn === 7 && destinationRow === 1 && window.castleAble.black.right) {
        if (!checkHasPiece(1, 7) && !checkHasPiece(1, 6) && getPieceClass(getBlockByRowAndColumn(1, 8)) === 'br') {
            $('.block[data-column=8][data-row=1]').removeClass('br');
            $('.block[data-column=6][data-row=1]').addClass('br');
            window.castleAble.black.right = false;
            window.castleAble.black.left = false;
            return true;
        }
    } else if (checkWhiteOrBlack(sourceBlock) === 'b' && destinationColumn === 3 && destinationRow === 1 && window.castleAble.black.left) {
        if (!checkHasPiece(1, 2) && !checkHasPiece(1, 3) && !checkHasPiece(1, 4) && getPieceClass(getBlockByRowAndColumn(1, 1)) === 'br') {
            $('.block[data-column=1][data-row=1]').removeClass('br');
            $('.block[data-column=4][data-row=1]').addClass('br');
            window.castleAble.black.right = false;
            window.castleAble.black.left = false;
            return true;
        }
    } else if (sourceRow - 1 === destinationRow && sourceColumn - 1 === destinationColumn) {
        checkIfKingMoved(sourceRow, sourceColumn);
        return true;
    } else if (sourceRow + 1 === destinationRow && sourceColumn + 1 === destinationColumn) {
        checkIfKingMoved(sourceRow, sourceColumn);
        return true;
    } else if (sourceRow - 1 === destinationRow && sourceColumn + 1 === destinationColumn) {
        checkIfKingMoved(sourceRow, sourceColumn);
        return true;
    } else if (sourceRow + 1 === destinationRow && sourceColumn - 1 === destinationColumn) {
        checkIfKingMoved(sourceRow, sourceColumn);
        return true;
    } else if (sourceRow + 1 === destinationRow && sourceColumn === destinationColumn) {
        checkIfKingMoved(sourceRow, sourceColumn);
        return true;
    } else if (sourceRow - 1 === destinationRow && sourceColumn === destinationColumn) {
        checkIfKingMoved(sourceRow, sourceColumn);
        return true;
    } else if (sourceRow === destinationRow && sourceColumn - 1 === destinationColumn) {
        checkIfKingMoved(sourceRow, sourceColumn);
        return true;
    } else if (sourceRow === destinationRow && sourceColumn + 1 === destinationColumn) {
        checkIfKingMoved(sourceRow, sourceColumn);
        return true;
    }
    return false;
}

/**
 *
 * @param sourceBlock
 * @param destinationBlock
 * @returns {boolean}
 *
 * Check valid Queen move
 */
function isValidQueenMove(sourceBlock, destinationBlock) {
    let sourceRow = $(sourceBlock).data('row');
    let sourceColumn = $(sourceBlock).data('column');
    let destinationRow = $(destinationBlock).data('row');
    let destinationColumn = $(destinationBlock).data('column');
    return isValidDiagonalMove(sourceRow, sourceColumn, destinationRow, destinationColumn) || isValidStraightMove(sourceRow, sourceColumn, destinationRow, destinationColumn);

}

/**
 *
 * @param sourceBlock
 * @param destinationBlock
 * @returns {boolean}
 *
 * Check valid WhitePawn move
 */
function isValidWhitePawnMove(sourceBlock, destinationBlock) {
    let sourceRow = $(sourceBlock).data('row');
    let sourceColumn = $(sourceBlock).data('column');
    let destinationRow = $(destinationBlock).data('row');
    let destinationColumn = $(destinationBlock).data('column');
    if (sourceRow === 7 && ((sourceRow - 1 === destinationRow) || (sourceRow - 2 === destinationRow)) && sourceColumn === destinationColumn) {
        if (isValidStraightMove(sourceRow, sourceColumn, destinationRow, destinationColumn))
            return checkWhiteOrBlack(destinationBlock) !== 'b' && checkWhiteOrBlack(destinationBlock) !== 'w';
    } else if (sourceRow - 1 === destinationRow && sourceColumn === destinationColumn) {
        return checkWhiteOrBlack(destinationBlock) !== 'b' && checkWhiteOrBlack(destinationBlock) !== 'w';
    } else if (sourceRow - 1 === destinationRow && sourceColumn - 1 === destinationColumn && checkWhiteOrBlack(destinationBlock) === 'b') {
        return true
    } else if (sourceRow - 1 === destinationRow && sourceColumn + 1 === destinationColumn && checkWhiteOrBlack(destinationBlock) === 'b') {
        return true
    }
    return false;
}

/**
 *
 * @param sourceBlock
 * @param destinationBlock
 * @returns {boolean}
 *
 * Check valid BlackPawn move
 */
function isValidBlackPawnMove(sourceBlock, destinationBlock) {
    let sourceRow = $(sourceBlock).data('row');
    let sourceColumn = $(sourceBlock).data('column');
    let destinationRow = $(destinationBlock).data('row');
    let destinationColumn = $(destinationBlock).data('column');
    if (sourceRow === 2 && ((sourceRow + 1 === destinationRow) || (sourceRow + 2 === destinationRow)) && sourceColumn === destinationColumn) {
        if (isValidStraightMove(sourceRow, sourceColumn, destinationRow, destinationColumn))
            return checkWhiteOrBlack(destinationBlock) !== 'w' && checkWhiteOrBlack(destinationBlock) !== 'b';
    } else if (sourceRow + 1 === destinationRow && sourceColumn === destinationColumn) {
        return checkWhiteOrBlack(destinationBlock) !== 'w' && checkWhiteOrBlack(destinationBlock) !== 'b';
    } else if (sourceRow + 1 === destinationRow && sourceColumn - 1 === destinationColumn && checkWhiteOrBlack(destinationBlock) === 'w') {
        return true
    } else if (sourceRow + 1 === destinationRow && sourceColumn + 1 === destinationColumn && checkWhiteOrBlack(destinationBlock) === 'w') {
        return true
    }
    return false;
}

/**
 *
 * @param sourceRow
 * @param sourceColumn
 * @param destinationRow
 * @param destinationColumn
 * @returns {boolean}
 *
 * Check if diagonal move is valid or not
 */
function isValidDiagonalMove(sourceRow, sourceColumn, destinationRow, destinationColumn) {
    let isValid, distance, row, column;
    for (let j = 1; j <= 8; j++) {
        if ((sourceRow - j) >= 0 || (sourceColumn - j) >= 0) {
            if (destinationRow === sourceRow - j && destinationColumn === sourceColumn - j) {
                isValid = true;
                break;
            }
        }
        if ((sourceRow + j) <= 8 || (sourceColumn + j) <= 8) {
            if (destinationRow === sourceRow + j && destinationColumn === sourceColumn + j) {
                isValid = true;
                break;
            }
        }
        if ((sourceRow + j) <= 8 || (sourceColumn - j) >= 0) {
            if (destinationRow === sourceRow + j && destinationColumn === sourceColumn - j) {
                isValid = true;
                break;
            }
        }
        if ((sourceRow - j) >= 0 || (sourceColumn + j) <= 8) {
            if (destinationRow === sourceRow - j && destinationColumn === sourceColumn + j) {
                isValid = true;
                break;
            }
        }
    }
    if (isValid) {
        distance = Math.abs(destinationRow - sourceRow);
        for (let i = 1; i < distance; i++) {
            if (sourceRow > destinationRow && sourceColumn > destinationColumn) {
                row = sourceRow - i;
                column = sourceColumn - i;
                if (checkHasPiece(row, column)) {
                    return false;
                }
            }
            if (sourceRow < destinationRow && sourceColumn < destinationColumn) {
                row = sourceRow + i;
                column = sourceColumn + i;
                if (checkHasPiece(row, column)) {
                    return false;
                }
            }
            if (sourceRow > destinationRow && sourceColumn < destinationColumn) {
                row = sourceRow - i;
                column = sourceColumn + i;
                if (checkHasPiece(row, column)) {
                    return false;
                }
            }
            if (sourceRow < destinationRow && sourceColumn > destinationColumn) {
                row = sourceRow + i;
                column = sourceColumn - i;
                if (checkHasPiece(row, column)) {
                    return false;
                }
            }
        }
        return true;
    }
    return false;
}

/**
 *
 * @param sourceRow
 * @param sourceColumn
 * @param destinationRow
 * @param destinationColumn
 * @returns {boolean}
 *
 * Check if straight move is valid or not
 */
function isValidStraightMove(sourceRow, sourceColumn, destinationRow, destinationColumn) {
    let distance, row, column;
    if (sourceRow === destinationRow || sourceColumn === destinationColumn) {
        if (sourceRow === destinationRow) {
            distance = Math.abs(destinationColumn - sourceColumn);
            for (let i = 1; i < distance; i++) {
                if (sourceColumn > destinationColumn) {
                    row = sourceRow;
                    column = sourceColumn - i;
                    if (checkHasPiece(row, column)) {
                        return false;
                    }
                }
                if (sourceColumn < destinationColumn) {
                    row = sourceRow;
                    column = sourceColumn + i;
                    if (checkHasPiece(row, column)) {
                        return false;
                    }
                }
            }
        }
        if (sourceColumn === destinationColumn) {
            distance = Math.abs(destinationRow - sourceRow);
            for (let i = 1; i < distance; i++) {
                if (sourceRow > destinationRow) {
                    row = sourceRow - i;
                    column = sourceColumn;
                    if (checkHasPiece(row, column)) {
                        return false;
                    }
                }
                if (sourceRow < destinationRow) {
                    row = sourceRow + i;
                    column = sourceColumn;
                    if (checkHasPiece(row, column)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    return false;
}