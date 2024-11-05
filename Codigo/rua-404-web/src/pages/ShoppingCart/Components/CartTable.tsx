import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

type CartItemProps = {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    darkImage: string;
  };
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
};

const CartItemRow = ({ item, updateQuantity, removeItem }: CartItemProps) => (
  <TableRow>
    <TableCell>
      <a href="#" className="flex items-center gap-4">
        <img
          className="h-24 w-24 rounded-md object-cover"
          src={item.image}
          alt={item.name}
        />
        <div className="w-[20vh] min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md">
          <a
            href="#"
            className="text-lg font-medium text-gray-900 leading-snug hover:underline"
          >
            {item.name}
          </a>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex bg-transparent p-0 items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
            >
              Adicionar aos favoritos
            </button>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="inline-flex bg-transparent p-0 items-center text-sm font-medium text-red-600 hover:underline"
            >
              Remover
            </button>
          </div>
        </div>
      </a>
    </TableCell>

    <TableCell className="text-center">
      <div className="flex items-center justify-center">
        <button
          type="button"
          disabled={item.quantity === 1}
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className={`inline-flex h-6 w-6 p-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none`}
        >
          -
        </button>
        <input
          type="text"
          className=" w-12 border-0 bg-transparent text-center text-sm font-medium text-gray-900"
          value={item.quantity}
          readOnly
        />
        <button
          type="button"
          disabled={item.quantity === 10}
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className={`inline-flex h-6 w-6 p-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none`}
        >
          +
        </button>
      </div>
    </TableCell>

    <TableCell className="text-right">
      <p className="text-base font-bold text-gray-900">
        {(item.price * item.quantity).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
    </TableCell>
  </TableRow>
);

type CartTableProps = {
  items: CartItemProps["item"][];
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
};

const CartTable = ({ items, updateQuantity, removeItem }: CartTableProps) => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-900">
            Produto
          </TableHead>
          <TableHead className="px-4 py-2 text-center text-sm font-semibold text-gray-900">
            Quantidade
          </TableHead>
          <TableHead className="px-4 py-2 text-right text-sm font-semibold text-gray-900">
            Preço
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        ))}
      </TableBody>
    </Table>
  </div>
);

export default CartTable;
