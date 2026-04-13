document.getElementById('error-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const codeSnippet = document.getElementById('code-snippet').value;
    const errorMessage = document.getElementById('error-message').value;

    const resultsSection = document.getElementById('results');
    const explanationBox = document.getElementById('explanation-box');
    const hintBox = document.getElementById('hint-box');
    const loadingIndicator = document.getElementById('loading');
    const submitBtn = document.getElementById('submit-btn');
    const errorBox = document.getElementById('error-box');

    // Reset UI
    resultsSection.classList.add('hidden');
    errorBox.classList.add('hidden');
    loadingIndicator.classList.remove('hidden');
    submitBtn.disabled = true;

    try {
        const response = await fetch('/api/analyze-error', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ codeSnippet, errorMessage })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || 'Something went wrong fetching from server.');
        }

        const data = await response.json();

        // The data should contain 'explanation' and 'hint' from the LLM
        if (data.explanation && data.hint) {
            explanationBox.textContent = data.explanation;
            hintBox.textContent = data.hint;

            resultsSection.classList.remove('hidden');
        } else {
            throw new Error('Did not receive a valid explanation and hint from the AI.');
        }

    } catch (error) {
        console.error("Error analyzing code:", error);
        errorBox.textContent = "Oops! We ran into an issue analyzing your code. Check the console or try again.";
        errorBox.classList.remove('hidden');
    } finally {
        loadingIndicator.classList.add('hidden');
        submitBtn.disabled = false;
    }
});