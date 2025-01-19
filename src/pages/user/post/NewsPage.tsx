import React, { useContext, useEffect, useState } from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { Link, useNavigate } from 'react-router-dom';
import { PostContext } from '../../../context/post/PostContext';
import TimeAgo from '../../../components/orther/timeAgo/TimeAgo';

const NewsPage: React.FC = () => {
  // Title Tag
  useEffect(() => {
    document.title = 'Tin Tức Mới Nhất - 7Teck';
  }, []);
  const { posts, getAllPosts } = useContext(PostContext);
  const [selectedPost, setSelectedPost] = useState<(typeof posts)[0] | null>(
    null
  );
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  useEffect(() => {
    if (posts.length > 0 && !selectedPost) {
      setSelectedPost(posts[0]);
    }
  }, [posts, selectedPost]);

  const handlePostClick = (post: (typeof posts)[0]) => {
    const titleSlug = encodeURIComponent(
      post?.title.toLowerCase().replace(/\s+/g, '-')
    );
    navigate(`/tin-tuc/${titleSlug}`);
  };

  return (
    <div>
      <HeaderResponsive Title_NavbarMobile="Tin Tức" />
      <div className="py-[60px] xl:pt-0">
        <div className="breadcrumbs px-[10px] py-2 text-sm text-black shadow lg:px-20">
          <ul className="font-light">
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="">Tin Tức Mới Nhất</Link>
            </li>
          </ul>
        </div>
        <div className="px-2 xl:px-20">
          <div className="py-3 text-center text-[30px] font-bold text-primary">
            Tin Mới Nhất
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {posts.map(post => (
              <div
                key={post?._id}
                className="relative cursor-pointer rounded border border-gray-50 bg-white p-2 shadow-inner hover:shadow-lg"
                onClick={() => handlePostClick(post)}
              >
                <p className="absolute left-1 top-1 rounded-sm bg-primary px-2 text-[12px] text-white">
                  {post?.catalog}
                </p>
                <img
                  loading="lazy"
                  src={post?.imageUrl}
                  alt="Ảnh đại diện"
                  className="h-[200px] w-full rounded-sm border object-cover xl:h-[300px]"
                />
                <p className="line-clamp-3 py-1 text-sm font-bold text-primary">
                  {post?.title}
                </p>
                <hr />
                <div
                  dangerouslySetInnerHTML={{ __html: post?.content }}
                  className="line-clamp-4 text-xs text-black"
                ></div>
                <p className="pt-2 text-[12px] text-primary">
                  {new Date(post?.updatedAt).toLocaleDateString('vi-VN')}
                  &nbsp;(
                  <TimeAgo date={post?.updatedAt} />)
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
