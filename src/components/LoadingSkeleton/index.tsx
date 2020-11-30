import Skeleton from 'react-loading-skeleton';

interface IProps {
  type: 'image' | 'title' | 'paragraph';
}

export const LoadingSkeleton = ({ type }: IProps) => {
  if (type === 'image') {
    return <Skeleton height={500} />;
  }

  if (type === 'title') {
    return (
      <p style={{ width: '100%' }}>
        <Skeleton height={50} />
      </p>
    );
  }

  if (type === 'paragraph') {
    return <Skeleton count={5} />;
  }

  return <Skeleton />;
};
