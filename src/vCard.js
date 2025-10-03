export function generateVCard(numbers) {
  let vcard = "";
  numbers.forEach((num, idx) => {
    vcard += `BEGIN:VCARD
VERSION:3.0
FN:WhatsApp Contact ${idx + 1}
TEL;TYPE=CELL:${num}
END:VCARD
`;
  });
  return vcard;
}
