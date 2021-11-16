type NestedNavigator<T> = {
  screen?: keyof T
  params?: T[keyof T]
}

export default NestedNavigator
