import React from 'react';
import Layout from '../components/Layout/Layout';
import "../styles/Homepage.css";
import { Link } from 'react-router-dom';
import phones from '../Products/Phones_List';
import Samsung from '../Products/Samsung_list';
import Bluetooth_devices from '../Products/Bluetooth_devices';

const Homepage = () => {
  const handleShowSmartphonesClick = () => {
    const smartphonesSection = document.getElementById('smartphones');
    smartphonesSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShowEarbudsClick = () => {
    const earbudsSection = document.getElementById('earbuds');
    earbudsSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className='homepage'>
        <div id="image">
          <div className="button-container">
            <button onClick={handleShowSmartphonesClick}>Show Smartphones</button>
          </div>
        </div>

        <div className='category-section'>
          <h3 className="category-heading" id="sp">smartphones</h3>
          <div className="product-grid" id="smartphones">
            {phones.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <Link to={`/Product${product.id}`}>View Details</Link>
              </div>
            ))}
          </div>
        </div>

        <div className='category-section'>
          <h3> </h3>
          <div className="product-grid">
            {Samsung.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <Link to={`/Product${product.id}`}>View Details</Link>
              </div>
            ))}
          </div>
        </div>

        <div id="image3">
          <div className="button-container2">
            <button onClick={handleShowEarbudsClick}>Show Earbuds</button>
          </div>
        </div>

        <div className='category-section' id="earbuds">
        <h3 className="category-heading" id="eb">Earbuds</h3>
          <div className="product-grid">
            {Bluetooth_devices.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <Link to={`/Product${product.id}`}>View Details</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
