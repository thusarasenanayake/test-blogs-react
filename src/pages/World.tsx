import React, { Reducer, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { sanityClient } from '../sanity';

interface Props {}
const category = 'World';

const World: React.FC<Props> = () => {
  const reducer: Reducer<FetchStatus, FetchActions> = (status, action) => {
    const { type, payload } = action;

    switch (type) {
      case 'SET_DATA':
        return { ...status, data: payload };
      case 'SET_ERROR':
        return { ...status, error: payload };
      case 'SET_LOADING':
        return { ...status, loading: payload };
    }
  };

  const [fetchStatus, dispatch] = useReducer(reducer, {
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    dispatch({ payload: true, type: 'SET_LOADING' });
    const querry = `*[_type == "post" && references(*[_type=="category" && title=="${category}"]._id)] | order(_updatedAt desc){
      _id,body,mainImage{asset->{url}},"slug":slug.current,title,_updatedAt,"author":author->name
    }`;

    sanityClient
      .fetch(querry, {
        category,
      })
      .then((data) => {
        dispatch({ payload: data, type: 'SET_DATA' });
      })
      .catch((error) => dispatch({ payload: error, type: 'SET_ERROR' }));
  }, []);

  // data block
  if (fetchStatus.data) {
    return (
      <>
        <div className="container my-4 d-flex flex-wrap justify-content-around mx-auto">
          {fetchStatus.data.map((post: Post, index) => (
            <Link
              to={`/${category.toLowerCase()}/${post.slug}`}
              className="text-decoration-none"
              state={{ ...post }}
              key={index}
            >
              <div className="card m-3" style={{ width: '20rem' }}>
                {post.mainImage ? (
                  <img
                    src={post.mainImage.asset.url}
                    className="card-img-top"
                    alt={'blog image ' + index}
                  />
                ) : (
                  false
                )}

                <div className="card-body">
                  <h5 className="card-title text-primary"> {post.title}</h5>
                  <p className="card-text">
                    {post.author}
                    <br />
                    <span className="text-dark">
                      {new Date(post._updatedAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  }

  // error block
  if (fetchStatus.error) {
    return (
      <>
        <div className="container my-4">
          <p className="lead">Error</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container my-4">
        <p className="lead">Loading</p>
      </div>
    </>
  );
};
export default World;
