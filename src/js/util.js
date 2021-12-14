export function fixImgUrl(value = '') {
  const match = 'http://c1.fengshows-cdn.com/'
  const target = 'http://q1.fengshows.cn/'
  return value.replace(match, target)
}
