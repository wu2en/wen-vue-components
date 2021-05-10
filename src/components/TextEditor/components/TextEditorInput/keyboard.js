// 控制键码
const CtrlKeyCode = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  CAPS_LOCK: 20,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  INSERT: 45,
  DELETE: 46,
  NUM_LOCK: 144
}

// 多媒体键码
const MediaKeyCode = {
  VOLUME_PLUS: 175,
  VOLUME_MINUS: 174,
  STOP: 179,
  MUTE: 173,
  BROWSER: 172,
  EMAIL: 180,
  SEARCH: 170,
  COLLECT: 171
}

/**
 * 获取按键码
 * @param {KeyboardEvent} e 键盘事件对象
 * @returns {number}
 */
function getKeyCode(e) {
  return e.which || e.keyCode || e.charCode
}

/**
 * 判断是否点击功能键
 * @param {KeyboardEvent} e 键盘事件对象
 * @returns {boolean}
 */
export function hasFuncCode(e) {
  const keyCode = getKeyCode(e)
  if (keyCode === CtrlKeyCode.TAB) {
    return true
  }
  if (keyCode === CtrlKeyCode.BACKSPACE) {
    return true
  }
  return false
}

/**
 * 阻止事件默认行为
 * @param {KeyboardEvent} e 键盘事件对象
 * @returns {boolean}
 */
export function stopDefault(e) {
  if (e.preventDefault) {
    e.preventDefault()
  } else {
    e.returnValue = false
  }
}
