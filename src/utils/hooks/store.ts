import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@customtypes/store'

const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { useAppDispatch, useAppSelector }
