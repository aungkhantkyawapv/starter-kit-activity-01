import { Routes, Route } from 'react-router-dom';
import DummyErrorPage from '../pages/public/DummyErrorPage';
import ErrorPage from '../pages/public/ErrorPage';
import HomePage from '../pages/public/HomePage';
import LifeCreate from '../pages/public/LifeCreatePage';
import LifeDetail from '../pages/public/LifeDetailPage';
import LivesPage from '../pages/public/LivesPage';
import NotFoundPage from '../pages/public/NotFoundPage';

const PublicRouter = () => (
    <Routes>
        <Route element={<HomePage />} path="" />
        <Route element={<DummyErrorPage />} path="dummyError" />
        <Route element={<ErrorPage />} path="500" />
        <Route element={<NotFoundPage />} path="*" />
        <Route element={<LivesPage />} path="lives" />
        <Route element={<LifeDetail />} path="life-detail/:id" />
        <Route element={<LifeCreate />} path="create-life" />
    </Routes>
);

export default PublicRouter;
