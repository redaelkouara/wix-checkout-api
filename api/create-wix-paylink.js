const fetch = require('node-fetch');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { totalAmount, items, currency } = req.body;

        const WIX_API_KEY = process.env.WIX_API_KEY;
        const WIX_SITE_ID = process.env.WIX_SITE_ID;

        const wixResponse = await fetch('https://www.wixapis.com/cashier/v1/payment-links', {
            method: 'POST',
            headers: {
                'Authorization': WIX_API_KEY,
                'wix-site-id': WIX_SITE_ID,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                paymentLink: {
                    title: `Shopify Order (${items ? items.length : 1} items)`,
                    price: {
                        amount: totalAmount.toString(),
                        currency: currency || 'GBP'
                    }
                }
            })
        });

        const data = await wixResponse.json();

        if (data.paymentLink && data.paymentLink.url) {
            return res.status(200).json({ success: true, paylinkUrl: data.paymentLink.url });
        } else {
            return res.status(400).json({ success: false, error: data });
        }

    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};
