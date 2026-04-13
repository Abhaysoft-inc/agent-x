fetch('http://localhost:3000/api/analyze-error', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        codeSnippet: `function greet(name) {
  console.log("Hello " + Name);
}
greet("Alice");`,
        errorMessage: "ReferenceError: Name is not defined"
    })
})
    .then(res => res.json())
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(err => console.error("Error:", err));