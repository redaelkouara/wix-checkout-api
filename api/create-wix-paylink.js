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
        return res.status(405).json({ error: 'Method not allowed. Send a POST request.' });
    }

    try {
        const { totalAmount, items, currency } = req.body;

        const WIX_API_KEY = process.env.WIX_API_KEY;
        const WIX_SITE_ID = process.env.WIX_SITE_ID;

        if (!WIX_API_KEY || !WIX_SITE_ID) {
            return res.status(500).json({ 
                success: false, 
                error: "Missing Vercel Environment Variables: Ensure WIX_API_KEY and WIX_SITE_ID are added in Vercel settings." 
            });
        }

        const wixResponse = await fetch('https://www.wixapis.com/cashier/v1/payment-links', {
            method: 'POST',
            headers: {
                'Authorization': const fetch = require('node-fetch');

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
        return res.status(405).json({ error: 'Method not allowed. Send a POST request.' });
    }

    try {
        const { totalAmount, items, currency } = req.body;

        const WIX_API_KEY = process.env.WIX_API_KEY;
        const WIX_SITE_ID = process.env.WIX_SITE_ID;

        if (!WIX_API_KEY || !WIX_SITE_ID) {
            return res.status(500).json({ 
                success: false, 
                error: "Missing Vercel Environment Variables: Ensure WIX_API_KEY and WIX_SITE_ID are added in Vercel settings." 
            });
        }

        const wixResponse = await fetch('https://www.wixapis.com/cashier/v1/payment-links', {
            method: 'POST',
            headers: {
                'Authorization': IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjY0ODVkODM3LTk4MTAtNDAwZC04OTRkLTk0NWFhZTE1MDA4NlwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjkyMTM4NWU1LTc4YjQtNGUzYi05NDZmLTkyYzY4N2M1MTRiZFwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCI1MjNjZDQwNS00MWM3LTQyMjAtYjUzNi0xODI0ZDZiNTFmNWNcIn19IiwiaWF0IjoxNzk0MTU5OTk4fQ.SSRV5DjA5Tzis7V-CqbHfTp3qrGEeIklHdE4AxyiZlnIN9jIJOww-AGm-nJpWnmy7_-KqbJL2JbkgmFvVTZEq9Q-lvMJMHc4_jcZenw-u0x04X1z2Bn4q1Zk_zBqjbjqGl9A5nXgH_xQMSHYYBpX4xWXS7SlScsdXg3J9TIB67A2l0lA0Vbc-JZufBsn8FRluph4JroJQ1tLylwde-77HdJiaeYmUpqsekJvqrV1h-2348jP1EWcGQ47hw0I6ar_VupANkpubJEz73jtWTyG_Xxq_jdOv8aDxRB1L4RBzww98ptWH9A_8RPsjT39KxWzILvPjRAJBdbGTWMlSEi4zQ
,
                'wix-site-id': 1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6,
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

        if (wixResponse.ok && data.paymentLink && data.paymentLink.url) {
            return res.status(200).json({ success: true, paylinkUrl: data.paymentLink.url });
        } else {
            return res.status(400).json({ success: false, error: data });
        }

    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};,
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

        if (wixResponse.ok && data.paymentLink && data.paymentLink.url) {
            return res.status(200).json({ success: true, paylinkUrl: data.paymentLink.url });
        } else {
            return res.status(400).json({ success: false, error: data });
        }

    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};
