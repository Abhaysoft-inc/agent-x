import { Router } from 'express';
import { z } from 'zod';
import { analyzeError } from '../services/debuggerAgent.js';
const router = Router();
const ErrorReqSchema = z.object({
    codeSnippet: z.string().min(1, "Code snippet is required"),
    errorMessage: z.string().min(1, "Error message is required"),
});
router.post('/analyze-error', async (req, res) => {
    try {
        const validatedBody = ErrorReqSchema.parse(req.body);
        const result = await analyzeError(validatedBody.codeSnippet, validatedBody.errorMessage);
        res.json(result);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error("Error analyzing code:", error);
        res.status(500).json({ error: "Failed to analyze error" });
    }
});
export default router;
//# sourceMappingURL=index.js.map