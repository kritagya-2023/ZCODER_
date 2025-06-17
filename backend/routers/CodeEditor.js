const express = require('express');
const axios = require('axios');
const router = express.Router();
const base64 = require('base-64');

// Helper to execute code using Judge0 API
async function runCode(lang, codeText) {
    const langIds = { python: 71, java: 62, c_cpp: 54 };
    const encodedCode = base64.encode(codeText);
    const langId = langIds[lang];

    try {
        const submit = await axios.post(
            'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true',
            { source_code: encodedCode, language_id: langId },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                    'X-RapidAPI-Key': '090edcf3damsha8b670058409d70p157097jsn8107d76181f0'
                }
            }
        );

        const token = submit.data.token;

        const result = await axios.get(
            `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                    'X-RapidAPI-Key': '090edcf3damsha8b670058409d70p157097jsn8107d76181f0'
                }
            }
        );

        if (result.data.stdout) return base64.decode(result.data.stdout);
        if (result.data.stderr) return base64.decode(result.data.stderr);
        return 'No output';
    } catch (err) {
        console.error('Execution error:', err);
        return 'Error executing code';
    }
}

// Route to execute code
router.post('/execute', async (req, res) => {
    const { language, code } = req.body;

    if (!['python', 'java', 'c_cpp'].includes(language)) {
        return res.status(400).json({ output: 'Unsupported language' });
    }

    const output = await runCode(language, code);
    res.json({ output });
});

module.exports = router;