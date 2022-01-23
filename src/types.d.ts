interface Post {
  slug: string;
  body: array;
  title: string;
  mainImage: {
    asset: { url: string };
  } | null;
  author: string;
  _updatedAt: string;
}

interface FetchActions {
  type: 'SET_DATA' | 'SET_ERROR' | 'SET_LOADING';
  payload: any;
}

interface FetchStatus {
  data: [] | null;
  error: string | null;
  loading: boolean;
}
