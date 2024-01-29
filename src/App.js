import { Route, Routes} from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';

function App() {
  return (
   <Routes>
    <Route path="/" element = {<PostListPage /> } />
    <Route path="/login" element = {<LoginPage />} />
    <Route path="/register" element = {<RegisterPage/>} />
    <Route path="/write" element = {<WritePage />} />
    <Route path="/@:username">
      <Route index element ={<PostListPage />} />
      <Route path=":postId" element = {<PostPage />} />
    </Route>
   </Routes>
   // username URL 파라미터가 주어졌을 경우에는 특정 사용자가 작성한 포스트 보여줌
  );
}

export default App;
