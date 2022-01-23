import React from 'react';
import { useLocation } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '../sanity';
import { useNavigate } from 'react-router-dom';
const BlockContent = require('@sanity/block-content-to-react');

interface Props {}

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: string) {
  return builder.image(source);
}

const serializers = {
  types: {
    image: (props: any) => {
      if (props.node.asset) {
        return (
          <img
            className="my-4 "
            style={{ width: '95%' }}
            src={urlFor(props.node.asset).url()}
            alt=""
          />
        );
      } else return null;
    },

    code: (props: any) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
};

const Post: React.FC<Props> = () => {
  const location = useLocation();
  const data = location.state as Post;
  const navigate = useNavigate();

  return (
    <>
      <div className="container my-4">
        <p
          onClick={() => navigate(-1)}
          className=" m-0 p-0 btn btn-sm btn-link text-decoration-none"
          style={{ fontWeight: 'bolder', fontSize: '25px' }}
        >
          ←
        </p>
        <h1 className="text-danger">{data.title}</h1>
        <p className="text-info">
          Written by <span className="text-dark">{data.author}</span>
          <br />
          Updated on{' '}
          <span className="text-dark">
            {new Date(data._updatedAt).toLocaleDateString()}
          </span>
        </p>
        <hr />
        {data.mainImage ? (
          <img
            src={data.mainImage.asset.url}
            alt=""
            className="my-4"
            style={{ maxWidth: '100% ' }}
          />
        ) : (
          false
        )}

        <div style={{ fontSize: '1.2rem' }}>
          <BlockContent blocks={data.body} serializers={serializers} />
        </div>
      </div>
    </>
  );
};

export default Post;
