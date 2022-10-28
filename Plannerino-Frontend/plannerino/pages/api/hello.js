// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Useful features if you have work that needs to be done on the back-end or expose api for your end user. Setting up server-only routes, code here won't increase the cliende-side javascript bundle that will be sent over the network.

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
