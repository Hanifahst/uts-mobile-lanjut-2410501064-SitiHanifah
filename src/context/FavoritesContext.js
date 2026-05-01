import { createContext, useReducer, useContext } from "react";

const FavoritesContext = createContext();

const initialState = {
    favorites: [],
};

function favoritesReducer(state, action) {
    switch (action.type) {
        case "ADD_FAVORITE":
        if (state.favorites.find((item) => item.id === 
            action.payload.id)) {
            return state;
        }
        return {
            ...state,
            favorites: [...state.favorites, action.payload],
        };

        case "REMOVE_FAVORITE":
        return {
            ...state,
            favorites: state.favorites.filter(
            (item) => item.id !== action.payload
            ),
        };

        default:
        return state;
    }
}

export function FavoritesProvider({ children }) {
    const [state, dispatch] = useReducer(favoritesReducer, 
            initialState);

    return (
        <FavoritesContext.Provider value={{ state, dispatch }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}