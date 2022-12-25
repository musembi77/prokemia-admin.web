// import easyinvoice from 'easyinvoice';
// import axios from 'axios';

// export default async function Create_Invoice(payload){
// 	create_invoice(payload)
//     // const result = await axios.post("http://localhost:5001/api/edit_order",payload)
//     // return result
// }

// const create_invoice=(payload)=>{
// 		const data = {
// 	    // Customize enables you to provide your own templates
// 	    // Please review the documentation for instructions and examples
// 	    "customize": {
// 	        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
// 	    },
// 	    "images": {
// 	        // The logo on top of your invoice
// 	        logo: 'https://res.cloudinary.com/musembi77/image/upload/v1671824849/ooa1dvpgz9relvhe6pfd.jpg',
// 	        // The invoice background
// 	        //"background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
// 	    },
// 	    // Your own data
// 	    "sender": {
// 	        "company": "Innovation Core Limited",
// 	        "address": "Kibo street, Industrial Area",
// 	        "city": "Nairobi",
// 	        "Pin": "P051465357M",
// 	        "mobile": "+254202525265",
// 	        //"custom2": "custom value 2",
// 	        //"custom3": "custom value 3"
// 	    },
// 	    // Your recipient
// 	    "client": {
// 	        "company": payload.name_of_client,
// 	        "email": payload.email_of_client,
// 	        // "address": "Clientstreet 456",
// 	        // "zip": "4567 CD",
// 	        // "city": "Clientcity",
// 	        // "country": "Clientcountry"
// 	        // "custom1": "custom value 1",
// 	        // "custom2": "custom value 2",
// 	        // "custom3": "custom value 3"
// 	    },
// 	    "information": {
// 	        // Invoice number
// 	        "number": payload._id,
// 	        // Invoice data
// 	        "date": "12-12-2021",
// 	        // Invoice due date
// 	        "due-date": "31-12-2021"
// 	    },
// 	    // The products you would like to see on your invoice
// 	    // Total values are being calculated automatically
// 	    "products": [
// 	        {
// 	            "quantity": payload.volume_of_items,
// 	            "description": payload.name_of_product,
// 	            "tax-rate": 16,
// 	            "price": payload.unit_price
// 	        },
// 	    ],
// 	    // The message you would like to display on the bottom of your invoice
// 	    "bottom-notice": "Take note of VAT computation.",
// 	    // "bottom-notice": "Cash with Order.",
// 	    // "bottom-notice": "Make Payments to Innovation Core LTD, SBM BANK KENYA, ACC No.0082102124001, Riverside Branch",
// 	    // Settings to customize your invoice
// 	    "settings": {
// 	        "currency": "KES", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
// 	        // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
// 	        // "tax-notation": "gst", // Defaults to 'vat'
// 	        // "margin-top": 25, // Defaults to '25'
// 	        // "margin-right": 25, // Defaults to '25'
// 	        // "margin-left": 25, // Defaults to '25'
// 	        // "margin-bottom": 25, // Defaults to '25'
// 	        // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
// 	        // "height": "1000px", // allowed units: mm, cm, in, px
// 	        // "width": "500px", // allowed units: mm, cm, in, px
// 	        // "orientation": "landscape", // portrait or landscape, defaults to portrait
// 	    },
// 	    // Translate your invoice to your preferred language
// 	    "translate": {
// 	        // "invoice": "FACTUUR",  // Default to 'INVOICE'
// 	        // "number": "Nummer", // Defaults to 'Number'
// 	        // "date": "Datum", // Default to 'Date'
// 	        // "due-date": "Verloopdatum", // Defaults to 'Due Date'
// 	        // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
// 	        // "products": "Producten", // Defaults to 'Products'
// 	        // "quantity": "Aantal", // Default to 'Quantity'
// 	        // "price": "Prijs", // Defaults to 'Price'
// 	        // "product-total": "Totaal", // Defaults to 'Total'
// 	        // "total": "Totaal" // Defaults to 'Total'
// 	    },
// 	};
// 	try{
// 		easyinvoice.createInvoice(data, function (result) {
// 		   easyinvoice.download('myInvoice.pdf', result.pdf);
// 		});
		
		
// 	}catch(err){
// 		console.log(err)
// 	}
// }

import axios from 'axios';

export default async function Create_Invoice(payload){
    const result = await axios.post("http://localhost:5001/api/create_invoice",payload)
    return result
}