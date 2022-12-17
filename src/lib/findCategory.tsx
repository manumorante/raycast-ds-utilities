const CATEGORIES = [
  {
    name: 'Font',
    icon: 'Text',
    props: [
      'font-family',
      'font-size',
      'font-weight',
      'list-style-type',
      'text-decoration',
      'line-height',
      'text-align',
      'text-transform',
      'white-space',
      'outline',
    ],
  },
  {
    name: 'Flex',
    icon: 'BarCode',
    props: [
      'flex',
      'flex-direction',
      'flex-wrap',
      'flex-flow',
      'flex',
      'flex-basis',
      'column-gap',
      'row-gap',
      'align-items',
      'align-self',
      'justify-content',
    ],
  },
  {
    name: 'Box model',
    icon: 'Box',
    props: ['box-sizing', '-webkit-box-orient', 'display'],
  },
  {
    name: 'Grid',
    icon: 'AppWindowSidebarLeft',
    props: ['grid'],
  },
  {
    name: 'Position',
    icon: 'Geopin',
    props: ['position', 'top', 'right', 'bottom', 'left'],
  },
  {
    name: 'Visibility',
    icon: 'Eye',
    props: ['overflow', 'overflow-y', 'z-index', 'opacity'],
  },
  {
    name: 'Background',
    icon: 'Image',
    props: [
      'background-color',
      'background',
      'background-image',
      'background-repeat',
      'background-position-x',
      'background-position-y',
      'background-size',
    ],
  },
  {
    name: 'Color',
    icon: 'EyeDropper',
    props: ['color', 'border-bottom-color', 'border-color', 'outline-color'],
  },
  {
    name: 'Manipulation',
    icon: 'EditShape',
    props: ['transform', 'transition-property', 'transition-timing-function', 'transition-duration'],
  },
  {
    name: 'FX',
    icon: 'Wand',
    props: [
      'cursor',
      'box-shadow',
      'border',
      'border-width',
      'border-top',
      'border-bottom',
      'border-left',
      'border-right',
      'border-bottom-right-radius',
      'border-bottom-left-radius',

      'border-bottom-style',
      'border-bottom-width',
      'border-style',
      'border-radius',
      'appearance',
      'pointer-events',
    ],
  },
  {
    name: 'Dimensions',
    icon: 'Maximize',
    props: [
      'max-width',
      'min-width',
      'min-height',
      'height',
      'width',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
    ],
  },
]

type Category = {
  name: string
  icon: string
  props?: string[]
}

const notCategory = {
  name: 'Not category',
  icon: '',
}

export default function findCategory(text: string): Category {
  let found: Category | undefined
  for (const category of CATEGORIES) {
    if (category.props.some((prop) => text.includes(prop))) {
      found = category
      break
    }
  }
  return found || notCategory
}
