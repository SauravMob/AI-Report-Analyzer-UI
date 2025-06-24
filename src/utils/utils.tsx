export const cleanAnalysisText = (text: string): string => {
    if (!text) return '';

    let cleanedText = text;

    // Remove <think> blocks and their content (case insensitive)
    cleanedText = cleanedText.replace(/<think>[\s\S]*?<\/think>/gi, '');

    // Remove other common AI reasoning tags
    cleanedText = cleanedText.replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, '');
    cleanedText = cleanedText.replace(/<thought>[\s\S]*?<\/thought>/gi, '');
    cleanedText = cleanedText.replace(/<analysis>[\s\S]*?<\/analysis>/gi, '');
    cleanedText = cleanedText.replace(/<reflection>[\s\S]*?<\/reflection>/gi, '');

    // Remove any XML-style tags that might be reasoning related
    cleanedText = cleanedText.replace(/<internal>[\s\S]*?<\/internal>/gi, '');
    cleanedText = cleanedText.replace(/<scratch>[\s\S]*?<\/scratch>/gi, '');

    // Remove multiple consecutive newlines (3 or more)
    cleanedText = cleanedText.replace(/\n{3,}/g, '\n\n');

    // Remove excessive spaces while preserving paragraph structure
    cleanedText = cleanedText.replace(/[ \t]{2,}/g, ' ');

    // Clean up any remaining empty lines at start/end
    cleanedText = cleanedText.trim();

    // Remove any leading/trailing quotes that might be artifacts
    cleanedText = cleanedText.replace(/^["'`]+|["'`]+$/g, '');

    return cleanedText;
}