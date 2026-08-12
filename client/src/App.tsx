import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import MainLayout from "./layouts/MainLayout.tsx";

import QuestionPage from "./pages/QuestionPage.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout />}>
            <Route index element={<QuestionPage />} />
        </Route>
    )
);

function App() {
    return <>
        <RouterProvider router={router} />
    </>
}

export default App;