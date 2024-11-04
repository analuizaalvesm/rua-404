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
          className="h-32 w-32 dark:hidden"
          src={item.image}
          alt={item.name}
        />
        <img
          className="hidden h-32 w-32 dark:block"
          src={item.darkImage}
          alt={item.name}
        />
        <div className="w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md">
          <a
            href="#"
            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
          >
            {item.name}
          </a>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex bg-transparent p-0 items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            >
              Adicionar aos favoritos
            </button>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="inline-flex bg-transparent p-0 items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
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
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="inline-flex h-6 w-6 p-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          -
        </button>
        <input
          type="text"
          className=" w-12 border-0 bg-transparent text-center text-sm font-medium text-gray-900 dark:text-white"
          value={item.quantity}
          readOnly
        />
        <button
          type="button"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="inline-flex h-6 w-6 p-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          +
        </button>
      </div>
    </TableCell>

    <TableCell className="text-right">
      <p className="text-base font-bold text-gray-900 dark:text-white">
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
          <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">
            Produto
          </TableHead>
          <TableHead className="px-4 py-2 text-center text-sm font-semibold text-gray-900 dark:text-white">
            Quantidade
          </TableHead>
          <TableHead className="px-4 py-2 text-right text-sm font-semibold text-gray-900 dark:text-white">
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
