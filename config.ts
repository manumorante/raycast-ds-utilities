import { getPreferenceValues } from '@raycast/api'

interface Preferences {
  projectPath: string
}

const preferences = getPreferenceValues<Preferences>()
const UTILITIES_PATH = preferences.projectPath + '/packages/styles/src/grid/base.css'
const TOKENS_PATH = preferences.projectPath + '/packages/styles/src/vars.css'

export const paths = {
  utilities: UTILITIES_PATH,
  tokens: TOKENS_PATH,
}
