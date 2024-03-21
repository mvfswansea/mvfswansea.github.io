import React, { useState, useEffect } from 'react';

import '../styles/css/components/news.css';

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Mock data for articles
  const mockArticles = [
    { id: 1, imageUrl: 'https://via.placeholder.com/150', title: 'Article 1', description: 'Description for article 1' },
    { id: 2, imageUrl: 'https://via.placeholder.com/150', title: 'Article 2', description: 'Description for article 2' },
    { id: 3, imageUrl: 'https://via.placeholder.com/150', title: 'Article 3', description: 'Description for article 3' },
    { id: 4, imageUrl: 'https://via.placeholder.com/150', title: 'Article 4', description: 'Description for article 4' },
    { id: 5, imageUrl: 'https://via.placeholder.com/150', title: 'Article 5', description: 'Description for article 5' },
    { id: 6, imageUrl: 'https://via.placeholder.com/150', title: 'Article 6', description: 'Description for article 6' },
    // Add more mock articles as needed
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate fetching data from an API
    setTimeout(() => {
      const startIndex = (page - 1) * 5;
      const endIndex = startIndex + 5;
      const newArticles = mockArticles.slice(startIndex, endIndex);
      setArticles(prevArticles => [...prevArticles, ...newArticles]);
      setLoading(false);
    }, 1000); // Simulate delay in fetching data
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {articles.length > 0 && (
        <div>
          {articles.map((article, index) => {
            if (index % 2 === 0) {
              return (
                <div key={article.id} className="article-left">
                  <div className="article-content">
                    <img src={article.imageUrl} alt="Article" className="article-image" />
                    <div className="article-text">
                      <h2>{article.title}</h2>
                      <p>{article.description}</p>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={article.id} className="article-right">
                  <div className="article-content">
                    <div className="article-text">
                      <h2>{article.title}</h2>
                      <p>{article.description}</p>
                    </div>
                    <img src={article.imageUrl} alt="Article" className="article-image" />
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default News;
