import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Navigate,
} from 'react-router-dom';
import './App.css';
import {LoginPage} from "./pages/login/LoginPage";
import {PrivateRoute} from "./routes/private-route/PrivateRoute";
import {HomePage} from "./pages/home/HomePage";
import {ArticlePage} from "./pages/article/ArticlePage";
import {CreateEditArticlePage} from "./pages/edit-article/CreateEditArticlePage";
import {Root} from "./routes/root";

const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root/>}>
        <Route index element={<HomePage />}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="article/new" element={<PrivateRoute><CreateEditArticlePage/></PrivateRoute>}/>
        <Route path="article/edit" element={<PrivateRoute><CreateEditArticlePage/></PrivateRoute>}>
            <Route path=":id" element={<PrivateRoute><CreateEditArticlePage/></PrivateRoute>}/>
        </Route>
        <Route path="article/:id" element={<ArticlePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
));

function App() {
    return (
        <RouterProvider router={appRouter}/>
    );
}

export default App;
