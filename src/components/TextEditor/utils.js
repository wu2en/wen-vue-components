/**
 * 数据获取
 * @param {Array} options 获取选项
 * @param {Object} src 数据源
 * @param {Object} initialData 初始数据
 * @returns {Object}
 */
export function DataGet(options, src, initialData = {}) {
  const data = { ...initialData }
  if (!src) {
    return data
  }
  if (Array.isArray(options)) {
    options.forEach(option => {
      if (typeof option === 'string') {
        data[option] = src[option]
      }
    })
  }
  return data
}
