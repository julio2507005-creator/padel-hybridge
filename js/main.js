// Tema claro / oscuro (se recuerda entre páginas)
const temaBtn = document.getElementById('temaBtn');
function aplicarTema(oscuro){ document.body.classList.toggle('oscuro', oscuro); temaBtn.textContent = oscuro ? '☀️' : '🌙'; }
try { aplicarTema(localStorage.getItem('tema') === 'oscuro'); } catch (e) {}
temaBtn.addEventListener('click', () => {
  const oscuro = !document.body.classList.contains('oscuro');
  aplicarTema(oscuro);
  try { localStorage.setItem('tema', oscuro ? 'oscuro' : 'claro'); } catch (e) {}
});

// Menú en celular
const menuBtn = document.getElementById('menuBtn'), menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => { const abierto = menu.classList.toggle('abierto'); menuBtn.setAttribute('aria-expanded', abierto); });

// Botones para compartir en redes sociales
const url = encodeURIComponent(location.href), txt = encodeURIComponent('Mira este sitio sobre pádel');
document.getElementById('shareWa').href = 'https://wa.me/?text=' + txt + '%20' + url;
document.getElementById('shareX').href = 'https://twitter.com/intent/tweet?text=' + txt + '&url=' + url;
document.getElementById('shareFb').href = 'https://www.facebook.com/sharer/sharer.php?u=' + url;

// Inicio: agregar razones a la lista
const formRazon = document.getElementById('formRazon');
if (formRazon) formRazon.addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('nuevaRazon'), texto = input.value.trim();
  if (!texto) { input.focus(); return; }
  const li = document.createElement('li'); li.textContent = texto;
  document.getElementById('listaRazones').appendChild(li); input.value = '';
});

// El juego: datos curiosos
const datos = [
  'El pádel se juega siempre en parejas.',
  'Las paredes forman parte del juego: la pelota puede rebotar en ellas y seguir en juego.',
  'El saque se hace por debajo de la cintura.',
  'La cancha mide 20 metros de largo por 10 de ancho.',
  'La pala no tiene cuerdas: es sólida y perforada.'
];
const botonDato = document.getElementById('botonDato');
if (botonDato) botonDato.addEventListener('click', () => {
  document.getElementById('datoCurioso').textContent = datos[Math.floor(Math.random() * datos.length)];
});

// Circuito profesional: contador de partidos (se guarda en el navegador)
const contador = document.getElementById('contador');
if (contador) {
  let partidos = 0;
  try { partidos = parseInt(localStorage.getItem('partidos') || '0', 10); } catch (e) {}
  const pintar = () => { contador.textContent = 'Partidos vistos: ' + partidos; try { localStorage.setItem('partidos', partidos); } catch (e) {} };
  pintar();
  document.getElementById('botonPartido').addEventListener('click', () => { partidos++; pintar(); });
  document.getElementById('botonReiniciar').addEventListener('click', () => { partidos = 0; pintar(); });
}

// Galería: visor de fotos
const galeria = document.getElementById('galeria');
if (galeria) {
  const visor = document.getElementById('visor'), img = document.getElementById('visorImg'), txtV = document.getElementById('visorTxt');
  galeria.addEventListener('click', e => {
    if (e.target.tagName !== 'IMG') return;
    img.src = e.target.src; img.alt = e.target.alt;
    txtV.textContent = e.target.closest('figure').querySelector('figcaption').textContent;
    visor.hidden = false;
  });
  const cerrar = () => { visor.hidden = true; };
  document.getElementById('cerrarVisor').addEventListener('click', cerrar);
  visor.addEventListener('click', e => { if (e.target === visor) cerrar(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });
}

// Contacto: validación del formulario
const formContacto = document.getElementById('formContacto');
if (formContacto) formContacto.addEventListener('submit', e => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const respuesta = document.getElementById('respuesta');
  if (!nombre || !mensaje) { respuesta.textContent = 'Completa tu nombre y tu mensaje.'; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) { respuesta.textContent = 'Escribe un correo válido.'; return; }
  respuesta.textContent = '¡Gracias, ' + nombre + '! Tu mensaje quedó listo (' + document.getElementById('nivel').value.toLowerCase() + ').';
  formContacto.reset();
});
