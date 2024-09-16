// PayPalModal.js
import React from 'react';
import Backdrop from './Backdrop'; // Import the Backdrop component
import ReactDOM from 'react-dom';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import './PayPalModal.css'; // Add your CSS for modal styling
import { toast } from 'react-toastify';

const PayPalModal = ({ isOpen, onClose, amount, onApprove }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
    <Backdrop onClick={onClose} />
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <PayPalScriptProvider
          options={{
            "client-id": "AdfJi2SLHz10OCfO8eA8G1JJO5WwebX0o9DXT-j6dRaQ5JIjhyV9a5m2rDvw31ObKRJUZbbnCj_vTGqY",

          }}
        >
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount,
                    },
                  },
                ],
            });
        }}
            onApprove={async (data, actions) => {
              const order = await actions.order.capture();
              onApprove(order.id);
            }}
            onError={(err) => {
              toast.error(err);
              console.error("Payment Error:", err);
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
        </>,
    document.getElementById('modal-hook')
  );
};

export default PayPalModal;
