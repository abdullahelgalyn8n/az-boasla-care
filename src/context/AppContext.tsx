import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../utils/catalogLogic';

export interface OrderRecord {
  id: string;
  createdAt: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: 'mother' | 'specialist';
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  savedResourceIds: string[];
  toggleSaveResource: (id: string) => void;
  registeredWebinarIds: string[];
  registerWebinar: (id: string) => void;
  orders: OrderRecord[];
  addOrder: (order: OrderRecord) => void;
  user: UserProfile | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('boasla_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [savedResourceIds, setSavedResourceIds] = useState<string[]>(['3b906f0a-925f-4885-9e6f-8684994a2514']);
  const [registeredWebinarIds, setRegisteredWebinarIds] = useState<string[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('boasla_cart', JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
    showToast(`تمت إضافة "${item.title}" إلى السلة بنجاح`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const clearCart = () => setCart([]);

  const toggleSaveResource = (id: string) => {
    setSavedResourceIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? 'تمت إزالة المصدر من المحفوظات' : 'تم حفظ المصدر في مكتبتك الخاصة');
      return next;
    });
  };

  const registerWebinar = (id: string) => {
    setRegisteredWebinarIds((prev) => {
      if (prev.includes(id)) return prev;
      showToast('تم تأكيد حجز مقعدك في الويبينار بنجاح!');
      return [...prev, id];
    });
  };

  const addOrder = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
  };

  const login = (name: string, email: string) => {
    setUser({ name, email, role: 'mother' });
    showToast(`أهلاً بكِ يا ${name} في منصة بوصلة`);
  };

  const logout = () => {
    setUser(null);
    showToast('تم تسجيل الخروج بنجاح');
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        savedResourceIds,
        toggleSaveResource,
        registeredWebinarIds,
        registerWebinar,
        orders,
        addOrder,
        user,
        login,
        logout,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
