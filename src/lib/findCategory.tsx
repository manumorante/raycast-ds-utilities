import { categories } from '../categories'

/**
 * Busca en una lista de categorías y devuelve la categoría que tenga
 * alguna propiedad que coincide con el texto de entrada.
 * Si no se encuentra ninguna coincidencia, devuelve un objeto
 * con valores predeterminados para "name" y "icon".
 */

const findCategory = (text: string) => {
  let categoryMatch = {
    name: 'Not category',
    icon: '',
  }

  for (const category of categories) {
    if (category.props.some((prop) => text.includes(prop))) {
      categoryMatch = category
      break
    }
  }
  return categoryMatch
}

export default findCategory
