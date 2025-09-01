import { usersOrders } from "@/shared/services/dto/cart.dto";
import { Container } from "./container";
import { translateDate } from "@/shared/lib/translate-date";
import { findImage } from "@/shared/lib/find-image";

interface Props {
  orders: usersOrders[];
}

export const ProfileOrder: React.FC<Props> = ({ orders }) => {
  return (
    <>
      {orders.map((order) => (
        <Container className="sm:my-10 my-5" key={order.id + String(order.updatedAt)}>
          <div className="sm:w-96 w-full border border-neutral-200 rounded-3xl ">
            <div className="p-3 border-b border-dashed border-b-neutral-200">
              <p className="text-gray-400 text-[14px]"> № {order.id}</p>
              <p className="text-[20px]">{translateDate(order.updatedAt)}</p>
            </div>
            <div className="p-3 border-b border-dashed border-b-neutral-200">
              <p className="text-gray-400 text-[14px]"> Адрес доставки</p>
              <p className="text-[16px] text-wrap">{order.address}</p>
            </div>
            <div className="p-3 border-b border-dashed border-b-neutral-200">
              <div className="flex flex-1 justify-between flex-row">
                <p className="text-gray-400 text-[14px]"> Сумма</p>
                <p className="text-[16px] text-wrap">{order.totalAmount} ₽</p>
              </div>
            </div>
            <div className="p-3">
              <div className="flex flex-1 flex-row gap-5 flex-wrap">
                {findImage(order.items).map((item, id) => (
                  <img key={id} src={item} width={50} alt="product" />
                ))}
              </div>
            </div>
          </div>
        </Container>
      ))}
    </>
  );
};
