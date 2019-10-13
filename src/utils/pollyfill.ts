export const assign = Object.assign || function() {
  const args = [].slice.call(arguments)
  const des = args.shift()
  for(let i = 0; i < args.length; i++) {
    const obj = args[i]
    for(let key in obj) {
      des[key] = obj[key]
    }
  }
  return des
}