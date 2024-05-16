/** 验证用户名 */
export const checkUsername = (value?: string) => new Promise((resolve, reject) => {
  if (!value || value?.trim() === '') return reject('请输入用户名')

  let isReg =
    /^[\u4e00-\u9fa5]|[a-zA-Z]$/.test(value) &&
    /^(?![·\-_\s])(?!.*[·\-_\s]$)/.test(value) &&
    /^[·\-\s\w\u4e00-\u9fa5]*$/.test(value) &&
    !/[0-9]/.test(value) &&
    !/[\u4e00-\u9fa5][a-zA-Z]{1}|[a-zA-Z][\u4e00-\u9fa5]{1}/.test(value) &&
    !/[·_\-\s]{2}/.test(value) &&
    !/[\u4e00-\u9fa5]\s[\u4e00-\u9fa5a]/.test(value) &&
    !/[a-z]\s{2,}[a-z]/i.test(value);
  if (!isReg) return reject('用户名不合法')

  resolve('校验通过')
})



/** 验证手机号 */
export const checkPhone = (value?: string) => new Promise((resolve, reject) => {
  if (!value || value?.trim() === '') return reject('请输入手机号')

  let isReg = /^1[34578]\d{9}$/.test(value)
  if (!isReg) return reject('手机号格式不正确')

  resolve('校验通过')
})