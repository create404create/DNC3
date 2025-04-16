async function checkStatus() {
  const phone = document.getElementById("phoneNumber").value.trim();
  if (!phone) {
    alert("Please enter a valid USA phone number");
    return;
  }

  const apiUrl = `https://tcpa.api.uspeoplesearch.net/tcpa/v1?x=${phone}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const dncNational = data.ndnc === "Yes" ? "Yes" : "No";
    const dncState = data.sdnc === "Yes" ? "Yes" : "No";

    document.getElementById("result").innerHTML = `
      <p><strong>Status:</strong> ${data.status}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Blacklist:</strong> ${data.listed}</p>
      <p><strong>Litigator:</strong> ${data.type}</p>
      <p><strong>State:</strong> ${data.state}</p>
      <p><strong>DNC National:</strong> ${dncNational}</p>
      <p><strong>DNC State:</strong> ${dncState}</p>
    `;
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("result").innerHTML = `<p style="color:red;">Error fetching data.</p>`;
  }
}
