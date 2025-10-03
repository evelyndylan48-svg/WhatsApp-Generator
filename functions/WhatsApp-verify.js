const fetch = require("node-fetch");

// WhatsApp Cloud API credentials (Hardcoded for local use)
const WHATSAPP_TOKEN = "EAAflYSMqmjYBPlXXKTffOAjwuYDPGTJakFUS2gzAVNJqyOJebA4pAZCCLQtxLvKMmlbKW0tvXpzkw4MQbyiwXG2fwP9MMi69fd7dGmB9Ug3IesJsZCTxubJZCUgDZCURg97efZCUEZArZCraEdbHjHi3TZCBkqHwvOD2KP6bx1CNfaj5RjyzhTjqsZCO1c0fI1YCC5osMcJTlzAF0Obn1HBGGm2QTwhZBWLI4B0uq3MwMZD";
const WHATSAPP_PHONE_ID = "787902677743270";

exports.handler = async function(event, context) {
  // Parse batch parameters
  const { areaCode, batchStart, batchSize } = JSON.parse(event.body);

  if (!areaCode || areaCode.length !== 3 || isNaN(areaCode)) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid area code." }) };
  }
  if (!batchStart || !batchSize || batchSize < 1 || batchSize > 100) {
    return { statusCode: 400, body: JSON.stringify({ error: "Batch size must be 1-100." }) };
  }

  let validNumbers = [];
  for (let idx = 0; idx < batchSize; idx++) {
    const numVal = batchStart + idx;
    if (numVal > 9999999) break;
    const number = `+1${areaCode}${numVal.toString().padStart(7, "0")}`;
    const url = `https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_ID}/messages`;
    const body = JSON.stringify({
      messaging_product: "whatsapp",
      to: number,
      type: "template",
      template: { name: "hello_world", language: { code: "en_US" } }
    });

    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        },
        body
      });
      const result = await resp.json();
      if (!result.error || result.error.message !== "recipient not found") {
        validNumbers.push(number);
      }
      await new Promise(res => setTimeout(res, 200));
    } catch (err) {
      // Ignore errors for individual numbers
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ validNumbers })
  };
};
