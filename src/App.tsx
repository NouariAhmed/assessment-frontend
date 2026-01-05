import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';

export default function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const baseUrl = 'https://my-api-assessment.onrender.com/api/products'; 
    const url = category ? `${baseUrl}?category=${category}` : baseUrl;

    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("API Error:", err));
  }, [category]);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Product Store</h1>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {/* Category Filter */}
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '8px' }}>
            <option value="">All Categories</option>
            <option value="Apparel">Apparel</option>
            <option value="Electronics">Electronics</option>
          </select>

          <div style={{ fontWeight: 'bold' }}>Cart: {cartCount} items</div>
        </div>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((p: any) => (
          <ProductCard key={p.id} product={p} onAddToCart={() => setCartCount(c => c + 1)} />
        ))}
      </div>
    </div>
  );
}
