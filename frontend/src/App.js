import React, { useState } from 'react';

const MuebleriaDemo = () => {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para obtener productos del servidor
  const obtenerProductos = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/productos');
      const data = await response.json();
      setProductos(data);
      setMensaje('✅ Productos cargados desde el servidor!');
    } catch (error) {
      setMensaje('❌ Error: ¿Está corriendo el servidor en puerto 4000?');
    }
    setLoading(false);
  };

  // Función para crear producto
  const crearProducto = async () => {
    setLoading(true);
    const nuevoProducto = {
      nombre: 'Producto desde React',
      precio: 1500
    };

    try {
      const response = await fetch('http://localhost:4000/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'muebles2024' // Si tienen autorización
        },
        body: JSON.stringify(nuevoProducto)
      });

      const data = await response.json();
      setMensaje('✅ Producto creado: ' + data.mensaje);
      // Recargar productos
      obtenerProductos();
    } catch (error) {
      setMensaje('❌ Error al crear producto');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#2c3e50' }}>🛋️ Mueblería Jota - Demo React</h1>
      
      <div style={{ 
        backgroundColor: '#ecf0f1', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>

      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={obtenerProductos}
          disabled={loading}
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            marginRight: '10px',
            marginBottom: '10px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Cargando...' : 'GET - Obtener Productos'}
        </button>

        <button 
          onClick={crearProducto}
          disabled={loading}
          style={{
            backgroundColor: '#27ae60',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creando...' : 'POST - Crear Producto'}
        </button>
      </div>

      {mensaje && (
        <div style={{
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: mensaje.includes('❌') ? '#e74c3c' : '#2ecc71',
          color: 'white',
          marginBottom: '20px'
        }}>
          {mensaje}
        </div>
      )}

      <h2 style={{ color: '#34495e' }}>📦 Productos desde el Servidor:</h2>
      
      {productos.length === 0 ? (
        <p style={{ color: '#7f8c8d' }}>No hay productos. Haz clic en "Obtener Productos"</p>
      ) : (
        <div style={{ display: 'grid', gap: '10px' }}>
          {productos.map((producto) => (
            <div 
              key={producto.id} 
              style={{
                border: '1px solid #bdc3c7',
                padding: '15px',
                borderRadius: '8px',
                backgroundColor: 'white'
              }}
            >
              <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                {producto.nombre}
              </h3>
              <p style={{ margin: '5px 0', color: '#27ae60', fontSize: '18px', fontWeight: 'bold' }}>
                ${producto.precio}
              </p>
              <small style={{ color: '#95a5a6' }}>ID: {producto.id}</small>
            </div>
          ))}
        </div>
      )}

      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#6c757d'
      }}>
        <ul>
          <li>Frontend (React) corre en puerto 3000</li>
          <li>Backend (Express) corre en puerto 4000</li>
          <li>Se comunican via HTTP usando fetch()</li>
          <li>Pueden abrir DevTools para ver las peticiones en Network</li>
        </ul>
      </div>
    </div>
  );
};

export default MuebleriaDemo;