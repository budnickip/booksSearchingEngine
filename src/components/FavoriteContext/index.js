import React, {createContext, useReducer} from "react";

export const FavoriteContext = createContext()

export const ACTIONS = {
    ADD_BOOK: 'add_book',
    DELETE_BOOKS: 'delete_books',
    FILTER_BOOKS: 'filter_books'
  }

export const FavoriteProvider = (props) =>{
    function reducer(favoriteList, action){
        switch(action.type){
          case ACTIONS.ADD_BOOK:
            if(favoriteList.some(e => e.id === action.book.id)){
              alert('Posiadasz już ten przedmiot w ulubionych')
              return [...favoriteList]
            }else{
              return [...favoriteList, action.book]
            }
          case ACTIONS.DELETE_BOOKS:
            return [...favoriteList.filter(value =>{
              return action.bookIndexes.indexOf(value.id) === -1;
            })]
          default:
            return [...favoriteList]
        }
      }

      const [favoriteList, dispatch] = useReducer(reducer, [])

      return(
          <FavoriteContext.Provider value={[favoriteList, dispatch]}>
              {props.children}
          </FavoriteContext.Provider>
      )

}