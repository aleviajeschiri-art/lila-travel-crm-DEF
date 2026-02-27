function getClients() {
  return JSON.parse(localStorage.getItem("clients")) || [];
}

function saveClients(clients) {
  localStorage.setItem("clients", JSON.stringify(clients));
}

function addClient() {
  const name = prompt("Nombre del cliente:");
  if (!name) return;

  const phone = prompt("Teléfono (con código país, ej: 593XXXXXXXXX):");
  const email = prompt("Correo electrónico:");
  const type = prompt("Tipo de viaje:");
  const budget = prompt("Presupuesto:");

  const client = {
    id: Date.now(),
    name,
    phone,
    email,
    type,
    budget,
    status: "Nuevo"
  };

  const clients = getClients();
  clients.push(client);
  saveClients(clients);
  renderClient(client);
}

function renderClient(client) {
  const div = document.createElement("div");
  div.className = "task";
  div.id = client.id;

  div.innerHTML = `
    <strong>${client.name}</strong><br>
    ${client.type}<br>
    $${client.budget}<br><br>
    <button onclick="openWhatsApp('${client.phone}','${client.name}')">WhatsApp</button>
    <button onclick="sendEmail('${client.email}','${client.name}')">Email</button>
  `;

  document.getElementById(client.status).appendChild(div);
}

function openWhatsApp(phone, name) {
  const message = encodeURIComponent(`Hola ${name}, te escribo de Lila Travel CRM ✈️`);
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}

function sendEmail(email, name) {
  const subject = encodeURIComponent("Información de tu viaje ✈️");
  const body = encodeURIComponent(`Hola ${name},\n\nTe escribimos desde Lila Travel CRM.`);
  window.open(`mailto:${email}?subject=${subject}&body=${body}`);
}

window.onload = function() {
  const clients = getClients();
  clients.forEach(client => renderClient(client));
};
