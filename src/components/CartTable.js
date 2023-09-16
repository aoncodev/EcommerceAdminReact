import React from 'react';

const CartTable = ({ cart, order }) => {
  if (!cart ) {
    return <div>No items in the cart.</div>;
  }

  return (
    <div className="bg-white w-full">
      <div className='flex justify-between'>
        <h2 className="text-2xl font-bold ">Cart</h2>
      </div>
      <div className="bg-white p-4 rounded-md mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal rounded-md">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Weight
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product, index) => (
                <tr key={index}>
                  <td className="px-3 py-1 border-b border-gray-200 text-sm">
                    <img src={product.images[0]} alt={product.title_en} className="w-20 h-20" />
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {product.product_id}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {product.product_name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {product.product_price}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {product.weight}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {product.quantity}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {product.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='w-full flex justify-end mt-3'>
            <h2 className='mt-2 text-xl font-semibold'>Total: {Number(order.total).toLocaleString('ko-KR')}₩</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
