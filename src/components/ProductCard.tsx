import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  isInStock: boolean;
  variants: string[];
}

interface Props {
  product: Product;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onAddToCart }: Props) {
  const [variant, setVariant] = useState(product.variants[0]);

  return (
    <div style={{ 
      border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', 
      width: '280px', display: 'flex', flexDirection: 'column', background: 'white'
    }}>
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3 style={{ margin: 0 }}>{product.name}</h3>
        <p style={{ margin: 0, fontWeight: 'bold', color: '#007bff' }}>${product.price.toFixed(2)}</p>
        
        <select 
          value={variant} onChange={(e) => setVariant(e.target.value)} 
          disabled={!product.isInStock}
          style={{ padding: '5px', borderRadius: '4px' }}
        >
          {product.variants.map(v => <option key={v} value={v}>{v}</option>)}
        </select>

        <button 
          onClick={onAddToCart}
          disabled={!product.isInStock}
          style={{
            marginTop: 'auto', padding: '10px', border: 'none', borderRadius: '4px',
            background: product.isInStock ? '#007bff' : '#ccc',
            color: 'white', cursor: product.isInStock ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}
        >
          {product.isInStock ? <><ShoppingCart size={16}/> Add to Cart</> : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
