const events = {}

function getEventKey(keycode) {
  const eventKey = Array.isArray(keycode) ?
    keycode.sort().join('-') : String(keycode)
  if (eventKey === '') {
    throw new Error('keycode value wrong')
  }
  return eventKey
}

function hasEvent(keycode) {
  const callbacks = events[getEventKey(keycode)]
  return callbacks && callbacks.length > 0
}

export function addEvent(keycode, callback) {
  const eventKey = getEventKey(keycode)
  const callbacks = events[eventKey]
  if (callbacks) {
    callbacks.push(callback)
  } else {
    events[eventKey] = [callback]
  }
}

export function removeEvent(keycode, callback) {
  const eventKey = getEventKey(keycode)
  const callbacks = events[eventKey]
  if (callbacks) {
    if (typeof callback === 'function') {
      events[eventKey] = callbacks.filter(cb => cb !== callback)
    } else {
      delete events[eventKey]
    }
  }
}
