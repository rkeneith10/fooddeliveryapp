import moncash from "nodejs-moncash-sdk";

moncash.configure({
  mode: "sandbox", //sandbox or live
  client_id: "1729d1855906b0549118756f081f4e1a",
  client_secret:
    "oHrr4tbnB1PH0uz6VQNUvbeqN6eWV-QdIkpuW9xbIjwrqKPO77rFVIqERY0P59AJ",
});
export default moncash;
