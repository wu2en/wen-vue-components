import { EditorCell, EditorRow } from '../TextEditorContent/parseText'

class Location {
  _Handler
  /**
   * @param {number} x
   * @param {number} y
   * @param {EditorCell} cell
   */
  constructor(x, y, cell) {
    this.toCell(x, y, cell)
  }
  setHandler(handler) {
    this._Handler = handler
  }
  setInput(input) {
    this._Input = input
  }
  /**
   * 设置坐标
   * @param {number} x
   * @param {number} y
   * @param {EditorCell | EditorRow} cellOrRow
   */
  toCell(x, y, cellOrRow) {
    this.x = Math.max(x, 2)
    this.y = Math.max(y, 2)
    this.cellOrRow = cellOrRow
    if (this._Handler) {
      this._Handler.setLocate(this)
    }
    if (this._Input) {
      this._Input.setLocate(this)
    }
  }

  /**
   * 获取光标坐标
   * @return {Coordinate}
   */
  getCoordinate() {
    let rowIndex = 0
    let colIndex = 0
    if (this.cellOrRow) {
      if (this.cellOrRow instanceof EditorCell) {
        rowIndex = this.cellOrRow.row.rowIndex
        colIndex = this.cellOrRow.colIndex
      } else if (this.cellOrRow instanceof EditorRow) {
        rowIndex = this.cellOrRow.rowIndex
        if (this.cellOrRow.last) {
          colIndex = this.cellOrRow.last.colIndex
        }
      }
    }
    return new Coordinate(rowIndex, colIndex)
  }
}

class Coordinate {
  constructor(rowIndex, colIndex) {
    this.rowIndex = Math.max(0, rowIndex)
    this.colIndex = Math.max(0, colIndex)
  }
}

export const cursorLocation = new Location(2, 2, null)
