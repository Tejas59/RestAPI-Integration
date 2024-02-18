function handleFormSubmit(event) {
  event.preventDefault();

 
  const SellingInput = document.getElementById('Selling');
  const productInput = document.getElementById('product');
  const categoryInput = document.getElementById('category');

  const Selling = Number(SellingInput.value);
  const product = productInput.value.trim();
  const category = categoryInput.value;

  if (!Selling || typeof Selling !== 'number') {
    alert('Selling must be in number format only');
    return;
  }

  if (!product) {
    alert('product missing');
    return;
  }

  if (!category) {
    alert('Please select category');
    return;
  }

 
  const productDetails = {
    Selling:Selling,
    product:product,
    category:category
  };

 
    axios.post("https://crudcrud.com/api/dfb763d1820f4e3a9d4350599d3b76e4/ecom", productDetails)
  
   .then((res)=>{
    updateproductList(res.data)
    console.log(res)
   })
  .catch((err)=>{
    console.log(err)
  });
  

 
  SellingInput.value = '';
  productInput.value = '';
  categoryInput.value = '';

  
  updateproductList(existingproducts);

 
  
}

function removeproduct(index) {
 
  const existingproducts = JSON.parse(localStorage.getItem('products') || '[]');

 
  if (confirm('Do you want to delete this product?')) {
    existingproducts.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(existingproducts));
    updateproductList(existingproducts);
  }
}

function editproduct(index) {
 
  const existingproducts = JSON.parse(localStorage.getItem('products') || '[]');
  const productToEdit = existingproducts[index];

 
  const SellingInput = document.getElementById('Selling');
  const productInput = document.getElementById('product');
  const categoryInput = document.getElementById('category');

  SellingInput.value = productToEdit.Selling;
  productInput.value = productToEdit.product;
  categoryInput.value = productToEdit.category;

  
  localStorage.setItem('editIndex', index);
  const updatedProduct = {
    Selling: SellingInput.value,
    product: productInput.value,
    category: categoryInput.value
  };

  // Make a PUT request to update the product in the CRUD CRUD database
  axios.put(`https://crudcrud.com/api/dfb763d1820f4e3a9d4350599d3b76e4/ecom/${productToEdit.id}`, updatedProduct)
    .then((res) => {
      console.log(res.data);
      // Optionally, you can do something after the data is successfully updated
    })
    .catch((err) => {
      console.log(err);
      // Handle errors
    });
}


function updateproductList(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

 
  products.forEach((product, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.textContent = `| Selling: ${product.Selling} |Description: ${product.product} | Category: ${product.category} |`;
    listItem.style.fontWeight = 'bold';
    listItem.style.fontSize = '16px';
    listItem.style.padding = '10px';

    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'rounded-pill', 'shadow-sm', 'fw-bold', 'text-uppercase', 'border', 'border-primary');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editproduct(index));

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'rounded-pill', 'shadow-sm', 'fw-bold', 'text-uppercase', 'border', 'border-primary');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => removeproduct(index));

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    productList.appendChild(listItem);
  });
}


const form = document.getElementById('product-form');
form.addEventListener('submit', handleFormSubmit);


document.addEventListener('DOMContentLoaded', () => {
  const existingproducts = JSON.parse(localStorage.getItem('products') || '[]');
  updateproductList(existingproducts);
});