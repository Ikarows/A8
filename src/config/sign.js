import md5 from 'js-md5'
function sign () {
  const time = new Date().getTime()
  const sign = md5('webh5' + time + '1fe49377cf6ad8df8d5a1c66131b1f20')
  return { sign, time }
}
export default sign
