import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import MainLayout from "./layouts/MainLayout.tsx";

import QuestionsPage from "./pages/QuestionsPage.tsx";
import ProfilePage from './pages/ProfilePage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import AuthPage from './pages/AuthPage.tsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout />}>
            <Route index element={<QuestionsPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/*' element={<NotFoundPage />} />
        </Route>
    )
);

function App() {
    return <>
        <RouterProvider router={router} />
    </>
}

export default App;