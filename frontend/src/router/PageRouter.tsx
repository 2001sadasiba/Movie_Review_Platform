// src/router/PageRouter.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, RegisterPage, HomePage } from '../pages';
import { AuthProvider } from '../services';


const PageRouterWrapper = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
};

const PageRouter = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <PageRouterWrapper />
            </AuthProvider>
        </BrowserRouter>
    );
};

export default PageRouter;
