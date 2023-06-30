class Familia {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    //this.imagen = 'familia.png';
  }
  mover(direccion, matriz) {
    const { posX, posY } = this;
    const filasYCol = matriz.length;

    switch (direccion) {
      case "arriba":
        if (posY > 0 && matriz[posY - 1][posX].calle) this.posY--;
        break;
      case "abajo":
        if (posY < filasYCol - 1 && matriz[posY + 1][posX].calle) this.posY++;
        break;
      case "izquierda":
        if (posX > 0 && matriz[posY][posX - 1].calle) this.posX--;
        break;
      case "derecha":
        if (posX < filasYCol - 1 && matriz[posY][posX + 1].calle) this.posX++;
        break;
    }
  }
  dibujarImagenFamilia(x, y, imagenSrc, colWidth, rowHeight) {
    let imagen = new Image();
    imagen.src = imagenSrc;
    imagen.onload = function() {
      ctx.drawImage(imagen, x, y, colWidth, rowHeight);
    };
  }
}
class Cuadrado {
  constructor() {
    this.casa;
    this.servicio;
    this.tipodeServicio;
    this.calle; // Agregamos una propiedad "calle" para distinguir entre calles y casas
  }

  dibujar(x, y, color, colWidth, rowHeight) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, colWidth, rowHeight);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, colWidth, rowHeight);
  }

  dibujarImagen(x, y, imagenSrc, colWidth, rowHeight) {
    let imagen = new Image();
    imagen.src = imagenSrc;
    imagen.onload = function() {
      ctx.drawImage(imagen, x, y, colWidth, rowHeight);
    }
  }
}

var canvas = document.getElementById("map"); // Crea lienzo para dibujar
var ctx = canvas.getContext("2d");
var matriz = CrearMatriz();
var rowHeight = canvas.height / matriz.length;
var colWidth = canvas.width / matriz[0].length;

function CrearMatriz() {
  var matriz = [];
  var filaYcolu = Math.floor(Math.random() * 5 + 5) * 2;

  for (var i = 0; i < filaYcolu; i++) {
    matriz[i] = [];
    for (var j = 0; j < filaYcolu; j++) {
      matriz[i][j] = new Cuadrado();
    }
  }
  return matriz;
}

function casasAdyacentes(i, j) {
  if (i > 0 && matriz[i - 1][j] && matriz[i - 1][j].casa === 0) {
    return true; // Hay una casa arriba
  }
  if (i < matriz.length - 1 && matriz[i + 1][j] && matriz[i + 1][j].casa === 0) {
    return true; // Hay una casa abajo
  }
  if (j > 0 && matriz[i][j - 1] && matriz[i][j - 1].casa === 0) {
    return true; // Hay una casa a la izquierda
  }
  if (j < matriz[0].length - 1 && matriz[i][j + 1] && matriz[i][j + 1].casa === 0) {
    return true; // Hay una casa a la derecha
  }

  return false; // No hay casas adyacentes
}
function serviciosAdyacentes(i, j) {
  if (i > 0 && matriz[i - 1][j] && matriz[i - 1][j].servicio > 1) {
    return true; // Hay un servicio arriba
  }
  if (i < matriz.length - 1 && matriz[i + 1][j] && matriz[i + 1][j].servicio > 1) {
    return true; // Hay un servicio abajo
  }
  if (j > 0 && matriz[i][j - 1] && matriz[i][j - 1].servicio > 1) {
    return true; // Hay un servicio a la izquierda
  }
  if (j < matriz.length - 1 && matriz[i][j + 1] && matriz[i][j + 1].servicio > 1) {
    return true; // Hay un servicio a la derecha
  }
  return false; // No hay servicios adyacentes
}
function LLenarCallesyCasas() {
  var sum = 0;
  var aux = 1;
  var aux2 = 0;
  var auxiliar = 0;
  var conta = 0, conta2 = 0, conta3 = 0, conta4 = 0, conta5 = 0;
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      var x = j * colWidth;
      var y = i * rowHeight;

      if (aux % 2 != 0) {
        matriz[i][j].calle = 1;
        matriz[i][j].dibujar(x, y, "#6A6A6A", colWidth, rowHeight);
        conta++
      } else if (Math.random() < 0.3) {
        matriz[i][j].calle = 1;
        matriz[i][j].dibujar(x, y, "#6A6A6A", colWidth, rowHeight);
        conta2++;
      } else if (Math.random() < 0.3) {
        if (matriz[i][j] && aux2 < Math.random() * 15 && auxiliar > Math.random() * 15 && !casasAdyacentes(i, j)) {
          matriz[i][j].casa = 0;
          matriz[i][j].dibujarImagen(x, y, "casa.png", colWidth, rowHeight);
          matriz[i][j].dibujar(x, y, "#00FF00", colWidth, rowHeight);
          aux2++;
          conta3++;
        }
        auxiliar++;
      } if (!matriz[i][j].calle && matriz[i][j].casa != 0) {
        matriz[i][j].tipodeServicio = 0;
        conta4++;
      }
      aux++;
    }
  }
  console.log('Calles:', conta);
  console.log('Calles2:', conta2);
  console.log('Casas:', conta3);
  console.log('servicios:', conta4);
}
function LLenarServicios() {
  var agua = 0, bombero = 0, colegio = 0, gas = 0, hospital = 0, luz = 0, policia = 0, supermercado = 0;
  var conta = 0;
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz.length; j++) {
      var x = j * colWidth;
      var y = i * rowHeight;
      tipodeServicio = Math.floor(Math.random() * 9 + 2);
      if (matriz[i][j] && !serviciosAdyacentes(i, j) && !casasAdyacentes(i, j)) {
        if (matriz[i][j].tipodeServicio == 0) {
          if (tipodeServicio == 2 && agua < 1) {
            matriz[i][j].servicio = 2;
            matriz[i][j].dibujarImagen(x, y, "agua.png", colWidth, rowHeight);
            matriz[i][j].dibujar(x, y, "#00FFFB", colWidth, rowHeight);
            agua++;
          } if (tipodeServicio == 3 && bombero < 1) {
            matriz[i][j].servicio = 3;
            matriz[i][j].dibujarImagen(x, y, "bombero.png", colWidth, rowHeight);
            matriz[i][j].dibujar(x, y, "#850000", colWidth, rowHeight);
            bombero++;
          } if (tipodeServicio == 4 && colegio < 1) {
            matriz[i][j].servicio = 4;
            matriz[i][j].dibujarImagen(x, y, "colegio.png", colWidth, rowHeight);
            matriz[i][j].dibujar(x, y, "#F82D02", colWidth, rowHeight);
            colegio++;
          } if (tipodeServicio == 5 && gas < 1) {
            matriz[i][j].servicio = 5;
            matriz[i][j].dibujarImagen(x, y, "gas.png", colWidth, rowHeight);
            matriz[i][j].dibujar(x, y, "#FFA601", colWidth, rowHeight);
            gas++;
          } if (tipodeServicio == 6 && hospital < 1) {
            matriz[i][j].servicio = 6;
            matriz[i][j].dibujarImagen(x, y, "hospital.png", colWidth, rowHeight);
            matriz[i][j].dibujar(x, y, "#00FFE8", colWidth, rowHeight);
            hospital++;
          } if (tipodeServicio == 7 && luz < 1) {
            matriz[i][j].servicio = 7;
            matriz[i][j].dibujarImagen(x, y, "luz.png", colWidth, rowHeight);
            matriz[i][j].dibujar(x, y, "#FFF001", colWidth, rowHeight);
            luz++;
          } if (tipodeServicio == 8 && policia < 1) {
            matriz[i][j].servicio = 8;
            matriz[i][j].dibujarImagen(x, y, "policia.png", colWidth, rowHeight);
            matriz[i][j].dibujar(x, y, "#000DAB", colWidth, rowHeight);
            policia++;
          } if (tipodeServicio == 9 && supermercado <= 1) {
            matriz[i][j].servicio = 9;
            matriz[i][j].dibujarImagen(x, y, "supermercado.png", colWidth, rowHeight);
            matriz[i][j].dibujar(x, y, "#045305", colWidth, rowHeight);
            supermercado++;
          }
          conta = agua + bombero + colegio + gas + hospital + luz + policia + supermercado;
        }
      }

    }
  }
  console.log('tiposdeServicios:', conta);
}
LLenarCallesyCasas();
LLenarServicios();

function manejarTeclaPresionada(event) {
  const direccion = {
    'ArrowUp': 'arriba',
    'ArrowDown': 'abajo',
    'ArrowLeft': 'izquierda',
    'ArrowRight': 'derecha'
  }[event.key];

  if (!direccion) return; // No hacer nada si la tecla no es una flecha

  const posAnteriorX = miFamilia.posX;
  const posAnteriorY = miFamilia.posY;

  miFamilia.mover(direccion, matriz);

  const cuadradoAnterior = matriz[posAnteriorX][posAnteriorY];
  const x = posAnteriorX * colWidth;
  const y = posAnteriorY * rowHeight;

  // Llamar al método dibujar() en la clase Cuadrado
  cuadradoAnterior.dibujar(ctx, '#6A6A6A', x, y);

  // Limpiar el cuadro anterior
  ctx.clearRect(x, y, colWidth, rowHeight);

  const instancia = new Cuadrado();
  instancia.dibujar(x, y, "#6A6A6A", colWidth, rowHeight);
  // Dibujar la imagen de la familia en las nuevas coordenadas
  const nuevaX = miFamilia.posX * colWidth;
  const nuevaY = miFamilia.posY * rowHeight;
  miFamilia.dibujarImagenFamilia(nuevaX, nuevaY, "familia.png", colWidth, rowHeight);
}
var posX, posY;
for (var i = 0; i < matriz.length; i++) {
  for (var j = 0; j < matriz.length; j++) {
    if (matriz[i][j] == 0) {
      posX = i;
      posY = j;
    }
  }
}
const miFamilia = new Familia(3, 4);

// Función para manejar las teclas presionadas
document.addEventListener('keydown', manejarTeclaPresionada);
