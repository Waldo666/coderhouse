const carrito = [];
let total = 0;

const agregarAlCarrito = (nombre, precio) => {
  carrito.push({ nombre, precio });
  total += precio;
  actualizarCarrito();
};

const actualizarCarrito = () => {
  const carritoLista = document.getElementById("carrito-lista");
  carritoLista.innerHTML = "";
  carrito.map((item, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("carrito-item");

    const productoInfo = document.createElement("span");
    productoInfo.textContent = `${item.nombre} - $${item.precio}`;
    listItem.appendChild(productoInfo);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&#10006;";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => eliminarDelCarrito(index));
    listItem.appendChild(deleteButton);

    carritoLista.appendChild(listItem);
  });
};

const eliminarDelCarrito = (index) => {
  const precioEliminado = carrito[index].precio;
  carrito.splice(index, 1);
  total -= precioEliminado;
  actualizarCarrito();
};

const comprar = () => {
  const paymentMethod = document.getElementById("payment-method").value;
  
  if (paymentMethod === "tarjeta") {
    const cuotasDiv = document.getElementById("cuotas");
    cuotasDiv.style.display = "block";
    
    const cuotas = document.getElementById("cuotas-select").value;
    const recargo = cuotas === "3" ? 0.10 : 0;
    
    alert(`Total a pagar: $${total + (total * recargo)}`);
  } else {
    alert(`Total a pagar: $${total}`);
  }
};

async function cargarDatosDesdeAPI() {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    const data = await response.json();

    data.slice(0, 12).forEach((productoItem, index) => {
      const producto = {
        nombre: productoItem.title,
        precio: productoItem.price,
        imagen: `../multimedia/img/${index + 1}.jpeg`
      };
      crearElementoProducto(producto);
    });
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
}

function crearElementoProducto(producto) {
  const productContainer = document.getElementById('product-container');

  const productDiv = document.createElement('div');
  productDiv.classList.add('product');

  const productImage = document.createElement('img');
  productImage.src = producto.imagen;
  productImage.alt = producto.nombre;

  const productName = document.createElement('h2');
  productName.textContent = producto.nombre;

  const productPrice = document.createElement('p');
  productPrice.textContent = `Precio: $${producto.precio}`;

  const addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Agregar al carrito';
  addToCartButton.addEventListener('click', () => agregarAlCarrito(producto.nombre, producto.precio));

  productDiv.appendChild(productImage);
  productDiv.appendChild(productName);
  productDiv.appendChild(productPrice);
  productDiv.appendChild(addToCartButton);

  productContainer.appendChild(productDiv);
}

cargarDatosDesdeAPI();

function mostrarDatos() {
  const formulario = document.getElementById("miFormulario");
  const formData = new FormData(formulario);
  const data = {};
  formData.forEach((value, key) => {
      data[key] = value;
  });
  console.log(data);
}