"use server"

export async function checkGatewayConfiguration() {
  // Check which gateways have their environment variables configured
  const stripeConfigured = !!process.env.STRIPE_SECRET_KEY
  const paypalConfigured = !!(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET)

  return {
    stripe: stripeConfigured,
    paypal: paypalConfigured,
    // Add other gateways as needed
  }
}

