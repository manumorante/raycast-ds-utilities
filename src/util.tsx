export const getVarValue = (css: string, prop: string) => {
  const regex = new RegExp(`--${prop}:\\s*(.*);`);
  const match = regex.exec(css);
  return match ? match[1] : null;
}

export const readVarsFromCSS = (css: string) => {
  const vars = css.match(/--[a-zA-Z0-9-_]+:[^;]+;/g)
  const varsObj = {}
  vars.forEach((v) => {
    const [key, value] = v.split(':')
    varsObj[key] = value
  })
  return varsObj
}

