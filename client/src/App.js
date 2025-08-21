import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import {HomePage} from "./features/home/HomePage";
import {ToLearn} from "./features/words/ToLearn";
import {Learned} from "./features/words/Learned";
import {LoginPage} from "./features/login/LoginPage";
import {UserPage} from "./features/user/UserPage";
import {EditWordForm} from "./features/words/EditWordForm";
import {NewWordForm} from "./features/words/NewWordForm";
import {WordsBatch} from "./features/words/WordsBatch";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: '/to-learn',
    element: <ToLearn/>
  },
  {
    path: '/learned',
    element: <Learned/>
  },
  {
    path: '/new-word',
    element: <NewWordForm/>
  },
  {
    path: '/words/:wordId/edit',
    element: <EditWordForm/>
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: "/user",
    element: <UserPage/>
  },
  {
    path: '/words-batch',
    element: <WordsBatch/>
  }
])

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
}

export default App;
