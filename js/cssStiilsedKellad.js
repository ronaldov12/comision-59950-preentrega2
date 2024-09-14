document.body.style.margin = '0';
document.body.style.padding = '0';


const navbar = document.querySelector('.navbar');

navbar.style.backgroundColor = '#333'; 
navbar.style.width = '100%';  
navbar.style.height = '100px';  
navbar.style.display = 'flex';  
navbar.style.alignItems = 'center';  
navbar.style.justifyContent = 'space-between';  
navbar.style.padding = '0';  
navbar.style.boxSizing = 'border-box';  
navbar.style.margin = '0';   


//elementos dentro del nav
const logoImg = document.querySelector('.logo img');
const carritoImg = document.querySelector('.carritoLogo img');
const ulElement = document.querySelector('ul');

// Estilos para la lista ul
ulElement.style.listStyle = 'none'; 
ulElement.style.margin = '0';      
ulElement.style.padding = '0';      
ulElement.style.display = 'flex';  
ulElement.style.alignItems = 'center'; 
ulElement.style.justifyContent = 'space-between';

// Estilos para la imagen del logo
logoImg.style.width = '80px';
logoImg.style.height = '80px';
logoImg.style.borderRadius = '40px'; 
logoImg.style.position = 'absolute';  
logoImg.style.left = '50%';  
logoImg.style.transform = 'translateX(-50%)'; 
logoImg.style.down = '50%';  
logoImg.style.transform += ' translateY(-50%)';  

// Estilos para la imagen del carrito
carritoImg.style.width = '30px';
carritoImg.style.height = '30px';

// Asegurar que el contenedor div dentro de ul esté bien alineado
const divContainer = document.querySelector('ul div');
divContainer.style.display = 'flex';  
divContainer.style.alignItems = 'center';  
divContainer.style.justifyContent = 'space-between';  

//*main
//!section 1
// hero section
const heroSection = document.createElement('div');
heroSection.id = 'heroSection';

document.getElementById('heroSection').appendChild(heroSection);

heroSection.style.position = 'relative';
heroSection.style.height = '80vh'; 
heroSection.style.backgroundImage = 'url("img/herosection.webp")'; 
heroSection.style.backgroundSize = 'cover'; 
heroSection.style.backgroundPosition = 'center'; 
heroSection.style.backgroundRepeat = 'no-repeat'; 
heroSection.style.backgroundAttachment = 'fixed';


//! section 2
const contenedorPrincipal = document.querySelector('div > #productos-contenedor');

// Aplicar estilos al contenedor principal
contenedorPrincipal.style.marginTop = '12rem'; 


//!footer
const footer = document.getElementById('footer');

// h1 para el copyright
const copyright = document.createElement('h1');
copyright.textContent = '© 2024 stiilsed kellad';

footer.appendChild(copyright);

// estilos al footer 
footer.style.position = 'relative';
footer.style.marginTop = '200px'; 
footer.style.height = '60px'; 
footer.style.backgroundColor = '#333';
footer.style.color = '#fff'; 
footer.style.display = 'flex'; 
footer.style.justifyContent = 'center'; 
footer.style.alignItems = 'center'; 
footer.style.textAlign = 'center'; 
copyright.style.margin = '0'; 
copyright.style.fontSize = '1.2em'; 