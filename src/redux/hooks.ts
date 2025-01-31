import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store"; // Adjust path as needed

// Custom hooks for dispatch and selector with types
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
