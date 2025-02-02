// TOrder.ts
export interface TOrder {
    _id: string; // Use string instead of ObjectId for frontend compatibility
    user: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    products: Array<{
        product: {
            _id: string; // Use string instead of ObjectId
            name: string;
            price: number;
            image?: string; // Optional if your product has an image field
        };
        quantity: number;
    }>;
    totalPrice: number;
    status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
    transactionId: string;
    isDeleted: boolean;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}