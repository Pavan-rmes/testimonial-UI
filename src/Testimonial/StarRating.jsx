import clsx from 'clsx';
import { StarIcon } from './Verticalscroll';


export function StarRating({ rating }) {
  return (
    <div className="flex">
      {[...Array(5).keys()].map((index) => (
        <StarIcon
          key={index}
          className={clsx(
            'h-5 w-5',
            rating > index ? 'fill-orange-500' : 'fill-gray-300'
          )} />
      ))}
    </div>
  );
}
