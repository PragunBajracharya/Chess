
/**
 *
 * @param div
 * @returns {string|string}
 * To check if current clicked piece is black or white
 * It returns b if black, w if white and blank if undefined
 */
function checkWhiteOrBlack(div) {
    return getClass(div) !== undefined && getClass(div).split(' ')[1] !== undefined ? getClass(div).split(' ')[1].split('')[0] : '';
}

/**
 *
 * @param div
 * @returns {jQuery}
 * Returns class list
 */
function getClass(div) {
    return $(div).attr('class');
}

/**
 *
 * @param div
 * @returns {*|string}
 * Return Piece class
 */
function getPieceClass(div) {
    return getClass(div).split(' ')[1];
}

/**
 *
 * Checks if the current clicked block is newly selected or not
 * @param div
 * @returns {*|jQuery}
 */
function isSelected(div) {
    return $(div).hasClass('selected');
}

/**
 *
 * @param row
 * @param column
 * @returns {jQuery|HTMLElement}
 *
 * Get a block by its row and column attribute
 */
function getBlockByRowAndColumn(row, column) {
    let selector = '.block[data-row = ' + row + '][data-column = ' + column + ']';
    return $(selector);
}

/**
 *
 * @param row
 * @param column
 * @returns {boolean}
 *
 * Check if a block with certain row and column has piece or not
 */
function checkHasPiece(row, column) {
    return checkWhiteOrBlack(getBlockByRowAndColumn(row, column)) === 'w' || checkWhiteOrBlack(getBlockByRowAndColumn(row, column)) === 'b';

}

/**
 *
 * @param sourceRow
 * @param sourceColumn
 *
 * Set castleAble to false if king moves
 */
function checkIfKingMoved(sourceRow, sourceColumn) {
    if (sourceRow === 8 && sourceColumn === 5) {
        window.castleAble.white.right = false;
        window.castleAble.white.left = false;
    }
    if (sourceRow === 1 && sourceColumn === 5) {
        window.castleAble.black.right = false;
        window.castleAble.black.left = false;
    }
}