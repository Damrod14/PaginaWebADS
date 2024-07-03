import paypal from '@paypal/checkout-server-sdk';

let clientId = "AezkcowsIIkuULGcj347pzEIwQpjd9RdpZXBTm-V4-xUEt439grshFFxplvJ1y0E-GGhLKr-mZunXcVE";
let clientSecret = "EBZq2koAUoxx9hFrYTyuV36leKmZoWLPPWZV7_7vpDd0pazmNycrjNr5d333FTIuEcy8NpGOPflDaJIA";

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export default client;
