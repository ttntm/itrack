onmessage = (msg) => {
  let increment;
  let total = msg.data.total;

  increment = setInterval(() => {
    total++;
    postMessage(total);
  }, 1000);
}