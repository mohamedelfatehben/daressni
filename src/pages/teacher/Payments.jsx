import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { getTeacherTransactions } from "../../apis/payments";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Legend } from "@headlessui/react";

function Payments() {
  const user = useSelector((state) => state.authReducer);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user.id) {
      getTeacherTransactions(user.id).then((res) => {
        if (res.status === 200) {
          setTransactions([...res.data]);
        }
      });
    }
  }, [user.id]);

  const calculateCumulativeBalance = (transactions) => {
    let cumulativeBalance = 0;
    return transactions.map((transaction) => {
      if (transaction.typeId === 1 && user.role !== "teacher") {
        // Debit
        cumulativeBalance -= transaction.amount;
      } else if (
        transaction.typeId === 2 ||
        (transaction.typeId === 1 && user.role === "teacher")
      ) {
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
          <div className="ml-8">
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
          <div className="flex flex-col items-center w-full p-4">
            <h2 className="text-xl font-bold mb-4">Transactions</h2>
            <div className="overflow-auto border border-gray-300 rounded-lg shadow-lg max-h-[60vh] w-full">
              <table className="min-w-full divide-y divide-gray-200">
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
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Group
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
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
                    formattedData.map((transaction, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {transaction.lastUpdated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {transaction.typeId === 2 ? "Debit" : "Credit"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {transaction.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {transaction.cumulativeBalance}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {transaction.lectures?.map((l) => l.title).join(", ")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {transaction.user?.firstName +
                            " " +
                            transaction.user?.lastName}
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

export default Payments;
