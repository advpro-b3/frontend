import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Ganti URL dengan endpoint Spring Boot Anda
        axios.get('http://35.198.219.82/order/list', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJwZXJzaHlmb24iLCJpYXQiOjE3MTY3MjEzNTQsImV4cCI6MTcxNjcyNDk1NH0.KZ0YUsJsESP3Aajj82hWmB-qu_bUoKFuN8YNbVYqfO0fQjYt7cfZnEc_BNefvnXN' // Ganti dengan token yang sesuai
            }
        })
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    const handleCompleteClick = (orderId) => {
        axios.put(`http://35.198.219.82/order/complete/${orderId}`)
            .then(response => {
                console.log(`Order with ID: ${orderId} has been completed.`);
                window.location.href = './orderuserlist';
                setOrders(orders.map(order =>
                    order.id === orderId ? { ...order, status: 'Completed' } : order
                ));
            })
            .catch(error => {
                console.error('Error completing order:', error);
            });
    };

    return (
        <div>
            <h1>Orders List</h1>
            <table>
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Produk</th>
                    <th>Total Harga</th>
                    <th>Metode Pengiriman</th>
                    <th>Kode Resi</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order[1]}>
                        <td>{order[1]}</td>
                        <td>{order[2]}</td>
                        <td>{order[5]}</td>
                        <td>{order[3]}</td>
                        <td>{order[4]}</td>
                        <td>{order[6]}</td>
                        <td>
                            <button onClick={() => handleCompleteClick(order[1])}>Pesanan Diterima</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;