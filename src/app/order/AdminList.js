import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [shippingMethods, setShippingMethods] = useState({});

    useEffect(() => {
        // Ganti URL dengan endpoint Spring Boot Anda
        axios.get('http://35.198.219.82/order/adminList', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcxNjcyNzgzOSwiZXhwIjoxNzE2NzMxNDM5fQ.vIFGopwC8H-AXyyc7zGqp0Pf-w47dSMNxkFR2GOrtnvk-6ljcBSCh_3owQDADWNS' // Ganti dengan token yang sesuai
            }
        })
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    const handleVerifyClick = (orderId) => {
        axios.put(`http://35.198.219.82/order/verify/${orderId}`)
            .then(response => {
                console.log(`Order with ID: ${orderId} has been verified.`);
                window.location.href = './orderadminlist';
                setOrders(orders.map(order =>
                    order.id === orderId ? { ...order, status: 'Verified' } : order
                ));
            })
            .catch(error => {
                console.error('Error verifying order:', error);
            });
    };

    const handleCancelClick = (orderId) => {
        axios.put(`http://35.198.219.82/order/cancel/${orderId}`)
            .then(response => {
                console.log(`Order with ID: ${orderId} has been cancelled.`);
                window.location.href = './orderadminlist';
                setOrders(orders.map(order =>
                    order.id === orderId ? { ...order, status: 'Cancelled' } : order
                ));
            })
            .catch(error => {
                console.error('Error cancelling order:', error);
            });
    };

    const handleShippingMethodChange = (orderId, method) => {
        setShippingMethods({
            ...shippingMethods,
            [orderId]: method
        });
    };

    const handleSubmitShippingMethod = (orderId) => {
        const selectedMethod = shippingMethods[orderId];
        if (!selectedMethod) {
            console.error('Please select a shipping method');
            return;
        }

        axios.put(`http://35.198.219.82/order/setDeliveryMethod/${orderId}/${selectedMethod}`)
            .then(response => {
                console.log(`Successfully set shipping method ${selectedMethod} for order ID: ${orderId}`);
                window.location.href = './orderadminlist';
            })
            .catch(error => {
                console.error('Error setting shipping method:', error);
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
                            <button onClick={() => handleVerifyClick(order[1])}>Verifikasi</button>
                            <button onClick={() => handleCancelClick(order[1])}>Cancel</button>
                            <div>
                                <select
                                    value={shippingMethods[order[1]] || ''}
                                    onChange={(e) => handleShippingMethodChange(order[1], e.target.value)}
                                >
                                    <option value="">Pilih Metode Pengiriman</option>
                                    <option value="JTE">JTE</option>
                                    <option value="SWZ">SiWuzz</option>
                                    <option value="GBK">GO-BEK</option>
                                </select>
                                <button onClick={() => handleSubmitShippingMethod(order[1])}>Pilih</button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;