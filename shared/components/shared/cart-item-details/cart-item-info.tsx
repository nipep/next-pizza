import { cn } from '@/shared/lib/utils';

interface Props {
  name: string;
  details: string;
  className?: string;
}
export const CartItemInfo: React.FC<Props> = ({ name, details, className}) => {
  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="sm:text-lg text-sm font-bold flex-1 leading-6">{name}</h2>
      </div>
      {details && <p className="sm:text-xs text-[10px] text-gray-400 w-[90%]">{details}</p>}
    </div>
  );
};
