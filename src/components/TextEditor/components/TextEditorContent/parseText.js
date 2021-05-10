const newLine = '\n'
export default (text) => {
  return text.split(newLine).reduce((rows, rowText) => {
    return rows.appendRow(rowText)
  }, newRows())
}

function newRows() {
  const rows = []
  rows.appendRow = rowText => {
    EditorRow.New({ text: rowText, rows })
    return rows
  }
  return rows
}

class Base {
  static New(...args) {
    return new this(...args)
  }
}

/**
 * @type {EditorCell}
 */
let activeCell = null
const textSeparator = ''
const noneCellText = ''
let rowId = 0
export class EditorRow extends Base {
  _uid = rowId++
  text = ''
  /**
   * @type {EditorCell[]}
   */
  cols = []
  constructor(options) {
    super()
    const { text, rows, cells, rowIndex = -1 } = DefaultEditorRowOptions.check(options)
    this.rows = rows
    // 判断行插入位置
    if (typeof rowIndex === 'number' && rowIndex >= 0 && rowIndex < rows.length) {
      rows.splice(rowIndex + 1, 0, this)
    } else {
      rows.push(this)
    }
    this.attachCells(cells)
    this.appendText(text)
  }
  get rowIndex() {
    return this.rows.indexOf(this)
  }
  get first() {
    return this.size ? this.cols[0] : null
  }
  get last() {
    return this.size ? this.cols[this.size - 1] : null
  }
  get size() {
    return this.cols.length
  }
  appendText(text = '') {
    this.insertText(text, this.size)
  }
  insertText(text = '', colIndex) {
    const chars = text.split(textSeparator)
    const charsLen = chars.length
    if (charsLen > 0) {
      let newText = ''
      const beginColIndex = colIndex > 0 ? colIndex - 1 : 0
      for (let index = 0; index < charsLen; index++) {
        const cellText = chars[index]
        if (cellText === newLine) {
          this.insertAfterRow(text.slice(index + 1), colIndex)
          break
        } else {
          newText += cellText
          this.insertCell(cellText, colIndex++)
        }
      }
      this.text = this.text.slice(0, beginColIndex) + newText + this.text.slice(beginColIndex)
    }
    this.removeNoneCell()
  }

  /**
   * 附件单元列表到当前行
   * @param {EditorCell[]} cells
   */
  attachCells(cells) {
    if (this.size === 0) {
      this.insertCell('', 0)
    }
    if (Array.isArray(cells) && cells.length > 0) {
      this.cols.push(...cells.map(cell => {
        cell.row = this
        return cell
      }))
    }
  }

  /**
   * 插入单元
   * @param {string} cellText
   * @param {number} colIndex
   * @returns {EditorCell}
   */
  insertCell(cellText, colIndex) {
    return EditorCell.New(cellText, cellText === newLine ? this.insertAfterRow() : this, colIndex)
  }

  /**
   * 插入行
   * @param {string} text
   * @param {number} index 出入位置
   * @returns {EditorRow}
   */
  insertAfterRow(text = '', index = -1) {
    let afterCells = []
    const afterCell = this.cols[index]
    if (afterCell) {
      const afterStart = afterCell.isTriggerBefore ? index : index + 1
      const afterCount = this.size - afterStart
      if (afterCount > 0) {
        afterCells = this.cols.splice(afterStart, afterCount)
        afterCells[0].isTriggerBefore = true
      }
    }
    return EditorRow.New({ text, rows: this.rows, rowIndex: this.rowIndex, cells: afterCells })
  }

  /**
   * 移除无效单元
   */
  async removeNoneCell() {
    await sleep(100)
    const cols = this.cols.filter(cell => !cell.isNone)
    if (cols.length > 0) {
      this.cols = cols
    }
  }
}

function sleep(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

class DefaultEditorRowOptions extends Base {
  text = ''
  rows = newRows()
  rowIndex = -1

  static _options = DefaultEditorRowOptions.New()
  static check(options) {
    if (typeof options !== 'object') {
      options = Object.create(null)
    }
    const defOptions = DefaultEditorRowOptions._options
    for (const prop in defOptions) {
      if (!Reflect.has(options, prop)) {
        options[prop] = defOptions[prop]
      }
    }
    return options
  }
}

let colId = 0
export class EditorCell extends Base {
  _uid = colId++
  /**
   * 是否点击前方触发
   * @type {boolean}
   */
  isTriggerBefore = false
  /**
   * @param {string} text
   * @param {EditorRow} row
   * @param {Number=} colIndex 插入位置
   */
  constructor(text, row, colIndex) {
    super()
    this.text = text
    this.row = row
    const targetCell = row.cols[colIndex]
    if (targetCell) {
      if (!targetCell.isTriggerBefore) {
        colIndex += 1
      }
      row.cols.splice(colIndex, 0, this)
    } else {
      row.cols.push(this)
    }
    activeCell = this
  }
  get colIndex() {
    return this.row.cols.indexOf(this)
  }
  get rowIndex() {
    return this.row.rowIndex
  }

  /**
   * 是否为无效单元
   * @returns {boolean}
   */
  get isNone() {
    return this.text === noneCellText
  }

  /**
   * 是否处于鼠标焦点
   * @returns {boolean}
   */
  get isActive() {
    return this === activeCell
  }
}
