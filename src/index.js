import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import MainCategoryContextProvider from './store/MainCategoryContextProvider';
import SubCategoryContextProvider from './store/SubCategoryContextProvider';
import BrandContextProvider from './store/BrandContextProvider';
import ProductContextProvider from './store/ProductContextProvider';
import UserContextProvider from './store/UserContextProvider';
import ContactContextProvider from './store/ContactContextProvider';
import NewsletterContextProvider from './store/NewsletterContextProvider';
import CartContextProvider from './store/CartContextProvider';
import WishlistContextProvider from './store/WishlistContextProvider';
import CheckOutContextProvider from './store/CheckOutContextProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainCategoryContextProvider>
      <SubCategoryContextProvider>
        <BrandContextProvider>
          <ProductContextProvider>
            <UserContextProvider>
              <ContactContextProvider>
                <NewsletterContextProvider>
                  <CartContextProvider>
                    <WishlistContextProvider>
                      <CheckOutContextProvider>
                        <App />
                      </CheckOutContextProvider>
                    </WishlistContextProvider>
                  </CartContextProvider>
                </NewsletterContextProvider>
              </ContactContextProvider>
            </UserContextProvider>
          </ProductContextProvider>
        </BrandContextProvider>
      </SubCategoryContextProvider>
    </MainCategoryContextProvider>
  </React.StrictMode>
);