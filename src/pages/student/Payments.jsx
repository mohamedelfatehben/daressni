import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { getTransactions } from "../../apis/payments";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Legend } from "@headlessui/react";

function StudentPayments() {
  const user = useSelector((state) => state.authReducer);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user.id) {
      getTransactions(user.id).then((res) => {
        if (res.status === 200) {
          setTransactions([...res.data]);
        }
      });
    }
  }, [user.id]);

  const calculateCumulativeBalance = (transactions) => {
    let cumulativeBalance = 0;
    return transactions.map((transaction) => {
      if (transaction.typeId === 1) {
        // Debit
        cumulativeBalance -= transaction.amount;
      } else if (transaction.typeId === 2) {
        // Credit
        cumulativeBalance += transaction.amount;
      }
      return {
        ...transaction,
        date: new Date(transaction.lastUpdated).toLocaleDateString(),
        cumulativeBalance: cumulativeBalance,
      };
    });
  };

  const formattedData = calculateCumulativeBalance(transactions);

  return (
    <Layout>
      <div className="w-full p-4">
        <div className="">
          <div className="">
            <h2 className="text-xl font-bold mb-4">Cumulative Balance Graph</h2>
            <div className="flex justify-center">
              <LineChart
                width={800}
                height={400}
                data={formattedData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cumulativeBalance"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </div>
          </div>
          <div className="">
            <h2 className="text-xl font-bold mb-4">Transactions</h2>
            <div className="flex justify-center max-h-[60vh] overflow-y-auto">
              <table className="transactions-table rounded">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Balance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Lectures
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Teacher
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Group
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y-2">
                  {formattedData.length === 0 ? (
                    <tr>
                      <td
                        className="px-6 py-4 whitespace-no-wrap text-center"
                        colSpan="7"
                      >
                        No transactions found.
                      </td>
                    </tr>
                  ) : (
                    formattedData
                      .sort(
                        (a, b) =>
                          new Date(a.lastUpdated) - new Date(b.lastUpdated)
                      )
                      .map((transaction, index) => (
                        <tr
                          key={index}
                          className={`${
                            transaction.typeId === 2
                              ? "!bg-green-500 text-white"
                              : ""
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(transaction.lastUpdated).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {transaction.typeId === 1 ? "Debit" : "Credit"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {transaction.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {transaction.cumulativeBalance}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {transaction.lectures
                              ?.map((l) => l.title)
                              .join(", ")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {transaction.typeId === 2 ? (
                              ""
                            ) : (
                              <>
                                {transaction.user?.firstName +
                                  " " +
                                  transaction.user?.lastName}
                              </>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {transaction.group?.name}
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default StudentPayments;
