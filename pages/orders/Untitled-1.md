<!--

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                   Image
                </th>
                <th scope="col" className="px-6 py-3">
                   Items
                </th>
                <th scope="col" className="px-6 py-3">
                    Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Action</span>
                </th>
            </tr>
        </thead>
        <tbody>

          {cart.map((item, index) => (
                  <tr key={index} className="bg-white ">
                    <td className="text-left py-3 px-4 border-b border-gray-200">
                      <div className="h-16 w-16 relative overflow-hidden">
                        <CldImage
                          src={item.imageUrl}
                          className="h-full w-full object-cover object-center rounded-full"
                          priority
                          fill={true}
                        />
                      </div>
                    </td>
                    <td className="text-left py-3 px-4 border-b border-gray-200">
                      {item.name}
                    </td>
                    <td className="text-left py-3 px-4 border-b border-gray-200">
                      {item.quantity}
                    </td>
                    <td className="text-left py-3 px-4 border-b border-gray-200">
                      <span>HTG</span> {item.price * item.quantity}
                    </td>
                    <td className="text-left py-3 px-4 border-b border-gray-200">
                      <FaRegTrashCan className="h-5 w-5 cursor-pointer text-red-600" />
                    </td>
                  </tr>
                ))}
        </tbody>
    </table>
</div>


 <p className="total-price font-bold text-md mt-4 float-right">
              Total Price: <span>HTG</span> {calculateTotalPrice()}
            </p> -->
