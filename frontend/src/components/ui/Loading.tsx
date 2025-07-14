import { Skeleton } from './skeleton';
const Loading = () => {
    return (

      <div className="max-w-4xl text-center p-6 space-y-4">
      <Skeleton className="h-8 lg:w-full w-2/3" />
      <Skeleton className="h-4 lg:w-3/4 w-1/4" />
      <Skeleton className="h-4 lg:w-2/3 w-1/3" />
      <Skeleton className="h-4 lg:w-3/5 w-1/5" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-20 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 lg:w-4/6 w-1/6" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3  w-2/3" />
      </div>
    </div>
    );
};

export default Loading;